import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useCreate, useCustom, useList } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Box, Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  CheckCircle as CheckCircleIcon,
  MyLocation as MyLocationIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import { useUserContext } from "#context";
import {
  ContactAdmin,
  CreateMissionModal,
  Map,
  Modal,
  RadiusSlider,
} from "#components";

export const FindEducator = () => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  const { user, userProfile } = useUserContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [noEducatorsModalOpen, setNoEducatorsModalOpen] = useState(false);
  const [contactAdminModalOpen, setContactAdminModalOpen] = useState(false);
  const [distance, setDistance] = useState(50);
  const [invitees, setInvitees] = useState<string[]>([]);
  const [dataToSubmit, setDataToSubmit] = useState<any>(null);
  const [isSendingInvitation, setIsSendingInvitation] = useState(false);
  const [findEducatorData, setFindEducatorData] = useState({
    coordinates: [],
    skills: [],
  });
  const [missionCreated, setMissionCreated] = useState(false); // NEW: Track if mission was created successfully

  // Dropdown menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropdownOpen = Boolean(anchorEl);

  const {
    mutate: createMission,
    data: missionsData,
    isLoading: isMissionLoading,
    isError: isMissionError,
  } = useCreate({
    resource: "missions",
    successNotification: false,
    errorNotification: false,
  });

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
        (
          findEducatorData?.coordinates.length &&
          findEducatorData?.skills.length &&
          missionCreated
        ) // NEW: Only enable if mission was created successfully
      ),
    },
  });

  const { refetch: sendInvitations } =
    useCustom({
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

  const role = user?.role;

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  // FIXED: Updated effect to handle mission creation with proper error handling
  useEffect(() => {
    if (dataToSubmit) {
      createMission(
        {
          values: dataToSubmit,
          meta: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        {
          onSuccess: () => {
            setModalOpen(false);
            setMissionCreated(true); // NEW: Set mission as created successfully
            setDataToSubmit(null); // Clear dataToSubmit after successful creation
          },
          onError: (error) => {
            console.error("Mission creation failed:", error);
            setMissionCreated(false); // NEW: Ensure mission is not marked as created
            // Reset states on error
            setDataToSubmit(null); // Clear dataToSubmit to prevent infinite loop
            setFindEducatorData({ coordinates: [], skills: [] });
            // Optionally show error modal or notification here
          },
        }
      );
    }
  }, [dataToSubmit]); // REMOVED createMission from dependencies

  // Effect for refetching when distance changes
  useEffect(() => {
    if (
      findEducatorData?.coordinates.length &&
      findEducatorData?.skills.length &&
      missionCreated // NEW: Only refetch if mission was created successfully
    ) {
      refetchEducators();
    }
  }, [
    distance,
    findEducatorData?.coordinates,
    findEducatorData?.skills,
    missionCreated,
  ]);

  // Effect for updating invitees when educatorsData changes
  useEffect(() => {
    if (missionCreated) {
      // NEW: Only update invitees if mission was created successfully
      const educatorsIds =
        educatorsData?.data.map((educator: any) => educator._id) || [];
      setInvitees(educatorsIds);
    }
  }, [educatorsData, missionCreated]);

  // Effect to show no educators modal when data is loaded and empty
  useEffect(() => {
    if (
      !isEducatorsLoading &&
      !isEducatorsError &&
      educatorsData?.data?.length === 0 &&
      findEducatorData?.coordinates.length &&
      findEducatorData?.skills.length &&
      missionCreated // NEW: Only show modal if mission was created successfully
    ) {
      setNoEducatorsModalOpen(true);
    }
  }, [
    isEducatorsLoading,
    isEducatorsError,
    educatorsData,
    findEducatorData,
    missionCreated,
  ]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    setMissionCreated(false); // NEW: Reset mission creation state
    navigate("/dashboard", { replace: true });
  };

  const handleNoEducatorsModalClose = () => {
    setNoEducatorsModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    setMissionCreated(false); // NEW: Reset mission creation state
  };

  const handleContactAdminModalClose = () => {
    setContactAdminModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    setMissionCreated(false); // NEW: Reset mission creation state
  };

  const handleExpandRadius = () => {
    setNoEducatorsModalOpen(false);
  };

  const handleContactAdmin = () => {
    setNoEducatorsModalOpen(false);
    setContactAdminModalOpen(true);
  };

  const handleSendInvitations = async () => {
    try {
      setIsSendingInvitation(true);
      const res = await sendInvitations();
      !res.isLoading && setIsSendingInvitation(false);
      setSuccessModalOpen(true);
    } catch (error) {
      console.log("Error sending invitations:", error);
    }
  };

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  // Dropdown handlers
  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
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
  if (!isMissionLoading && missionCreated) {
    // NEW: Only show markers if mission was created successfully
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

  // FIXED: Updated condition to check if mission was created successfully
  const isMissionCreationPhase = !missionCreated || !educatorsData?.data.length;

  return (
    <Box sx={{ position: "relative" }}>
      {/* Radius dropdown positioned at top right - only show if mission was created */}
      {missionCreated && (
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: 1000,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleDropdownClick}
            endIcon={<ExpandMoreIcon />}
            startIcon={<MyLocationIcon />}
            sx={{
              backgroundColor: "white",
              textTransform: "none",
              minWidth: 120,
              boxShadow: theme.shadows[2],
              color: theme.palette.text.secondary,
            }}
          >
            Radius
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={dropdownOpen}
            onClose={handleDropdownClose}
            PaperProps={{
              sx: {
                mt: 1,
                ml: -5,
                width: 300,
                height: 85,
                borderRadius: theme.shape.borderRadius,
              },
            }}
          >
            <MenuItem disableRipple>
              <RadiusSlider
                distance={distance}
                handleDistanceChange={handleDistanceChange}
              />
            </MenuItem>
          </Menu>
        </Box>
      )}

      {/* Map displaying educator locations */}
      <Map markers={markers} center={center} />

      {isMissionCreationPhase ? (
        <>
          {/* Button to create mission */}
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
        </>
      ) : (
        <>
          {/* Button to send invitations */}
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
        </>
      )}

      {/* Loading overlay */}
      {(isMissionLoading || isSendingInvitation) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: theme.palette.primary.light,
            }}
          />
        </Box>
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
        button1OnClick={() =>
          navigate(`/missions/${missionsData?.data._id}`, { replace: true })
        }
        icon={<CheckCircleIcon />}
        title="Invitations Sent Successfully!"
        description={`Invitations have been sent to ${
          invitees.length
        } educator${
          invitees.length !== 1 ? "s" : ""
        }. You'll be notified as soon as they respond.`}
        hasButton={true}
        hasButton1={true}
        buttonText="Close"
        button1Text="View Invitation Status"
        hasAdditionalElements={false}
      />

      {/* No educators found modal */}
      <Modal
        open={noEducatorsModalOpen}
        onClose={handleNoEducatorsModalClose}
        onSubmit={handleContactAdmin}
        button1OnClick={handleExpandRadius}
        icon={<InfoIcon sx={{ color: "#FFA726" }} />}
        title="No Educators Found Nearby"
        description="No educators are available in your current search radius. You can try expanding the radius to reach more educators or contact our admin team for assistance."
        hasButton={true}
        hasButton1={true}
        buttonText="Contact Admin"
        button1Text="Expand Radius"
        hasAdditionalElements={false}
      />

      {/* Contact admin modal */}
      <Modal
        open={contactAdminModalOpen}
        onClose={handleSuccessModalClose}
        onSubmit={handleContactAdminModalClose}
        icon={<HelpOutlineIcon sx={{ color: "#2196F3" }} />}
        title="Need Help Finding Educators"
        description="Contact admin team directly for assistance with your mission, educator availability, or technical questions."
        hasButton={true}
        hasButton1={false}
        buttonText="Close"
        additionalElements={<ContactAdmin />}
        hasAdditionalElements={true}
      />
    </Box>
  );
};
