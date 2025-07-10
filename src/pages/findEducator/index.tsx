import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useCreate, useCustom, useList } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useUserContext } from "#context";
import { CreateMissionModal, Map, Modal } from "#components";

export const FindEducator = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile } = useUserContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [distance, setDistance] = useState(50);
  const [invitees, setInvitees] = useState<string[]>([]);
  const [dataToSubmit, setDataToSubmit] = useState<any>(null);
  const [findEducatorData, setFindEducatorData] = useState({
    coordinates: [],
    skills: [],
  });

  const { role } = user;

  const { mutate: createMission, data: missionsData } = useCreate();

  const {
    data: educatorsData,
    isLoading: isEducatorsLoading,
    isError: isEducatorsError,
    refetch: refetchEducators,
  } = useList({
    resource: "educators/nearby",
    filters: [
      {
        field: "coordinates",
        operator: "eq",
        value: findEducatorData?.coordinates?.join(","),
      },
      {
        field: "skills",
        operator: "eq",
        value: findEducatorData?.skills?.join(","),
      },
      { field: "distance", operator: "eq", value: distance },
    ],
    queryOptions: {
      enabled: !!(
        missionsData &&
        findEducatorData?.coordinates.length &&
        findEducatorData?.skills.length
      ),
    },
  });

  const { refetch: sendInvitations } = useCustom({
    url: "missions/send-invitations",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      payload: {
        missionId: missionsData?.data._id,
        invitees,
      },
    },
    queryOptions: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  // Effect for refetching when distance changes
  useEffect(() => {
    if (
      findEducatorData?.coordinates.length &&
      findEducatorData?.skills.length
    ) {
      refetchEducators();
    }
  }, [distance, findEducatorData?.coordinates, findEducatorData?.skills]);

  // Effect for updating invitees when educatorsData changes
  useEffect(() => {
    const educatorsIds =
      educatorsData?.data.map((educator: any) => educator._id) || [];
    setInvitees(educatorsIds);
  }, [educatorsData]);

  useEffect(() => {
    if (dataToSubmit) {
      createMission({
        resource: "missions",
        values: dataToSubmit,
        meta: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
    }
  }, [dataToSubmit]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    refetchEducators();
    navigate("/dashboard", { replace: true });
  };

  const handleSendInvitations = async () => {
    try {
      await sendInvitations();
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Error sending invitations:", error);
    }
  };

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  const center: LatLngTuple = [
    findEducatorData?.coordinates[1] ??
      userProfile?.officeAddressCoordinates?.coordinates[1] ??
      0,
    findEducatorData?.coordinates[0] ??
      userProfile?.officeAddressCoordinates?.coordinates[0] ??
      0,
  ];

  type Marker = {
    position: {
      lng: number;
      lat: number;
    };
    name: string;
    skills: string[];
  };

  const markers: Marker[] = [];
  if (educatorsData) {
    educatorsData?.data.forEach((educator: any) => {
      markers.push({
        position: {
          lng: educator.fullAddressCoordinates.coordinates[0],
          lat: educator.fullAddressCoordinates.coordinates[1],
        },
        name: educator.name,
        skills: educator.skills,
      });
    });
  }

  return (
    <Box sx={{ position: "relative" }}>
      {/* Distance slider positioned at top right */}
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: 1000,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: theme.spacing(1, 2),
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: 300,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: "0.875rem", textAlign: "right" }}
        >
          {distance === 50
            ? `Default Radius: ${distance} km`
            : `Radius: ${distance} km`}
        </Typography>
        <Slider
          value={distance}
          onChange={handleDistanceChange}
          min={10}
          max={100}
          step={10}
          marks
          valueLabelDisplay="auto"
          sx={{
            color: theme.palette.primary.main,
            "& .MuiSlider-thumb": {
              width: 20,
              height: 20,
            },
            "& .MuiSlider-track": {
              height: 4,
            },
            "& .MuiSlider-rail": {
              height: 4,
            },
          }}
        />
      </Box>

      {/* Map displaying educator locations */}
      <Map markers={markers} center={center} />

      {/* Opens create mission modal */}
      {!educatorsData?.data.length ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{
            position: "absolute",
            bottom: theme.spacing(5),
            zIndex: 1000,
            right: "50%",
            textTransform: "none",
            padding: theme.spacing(1, 2),
            fontSize: theme.typography.body2.fontSize,
          }}
        >
          Create Mission
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendInvitations}
          sx={{
            position: "absolute",
            bottom: theme.spacing(5),
            zIndex: 1000,
            right: "50%",
            textTransform: "none",
            padding: theme.spacing(1, 2),
            fontSize: theme.typography.body2.fontSize,
          }}
        >
          Send Invitations
        </Button>
      )}

      {/* Create mission modal */}
      <CreateMissionModal
        open={modalOpen}
        onClose={handleModalClose}
        setFindEducatorData={setFindEducatorData}
        setDataToSubmit={setDataToSubmit}
      />

      {/* Success modal for invitations sent */}
      <Modal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        onSubmit={handleSuccessModalClose}
        button1OnClick={() => navigate(`/missions/${missionsData?.data._id}`, { replace: true })}
        icon={<CheckCircleIcon />}
        title="Invitations Sent Successfully!"
        description={`Invitations have been sent to ${
          invitees.length
        } educator${
          invitees.length !== 1 ? "s" : ""
        }. You’ll be notified as soon as they respond.`}
        showButton={true}
        showButton1={true}
        buttonText="Close"
        button1Text="View Invitation Status"
      />
    </Box>
  );
};
