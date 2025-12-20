import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import { LatLngTuple } from "leaflet";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Button, CircularProgress } from "@mui/material";
import { useCreate, useCustom, useList } from "@refinedev/core";

import {
  ContactAdmin,
  CreateMissionModal,
  Map,
  Modal,
  RadiusSlider,
} from "#components";
import { useUserContext } from "#context";

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
  const [missionCreated, setMissionCreated] = useState(false);

  // Dropdown menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    mutate: createMission,
    data: missionsData,
    isLoading: isMissionLoading,
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
      // {
      //   field: "skills",
      //   operator: "eq",
      //   value: findEducatorData?.skills?.join(","),
      // },
      { field: "distance", operator: "eq", value: distance },
    ],
    queryOptions: {
      enabled: !!(
        findEducatorData?.coordinates.length &&
        // findEducatorData?.skills.length &&
        missionCreated
      ),
    },
  });

  const { refetch: sendInvitations } = useCustom({
    url: "/missions/send-invitations",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      payload: {
        missionId: missionsData?.data?._id,
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

  // Updated effect to handle mission creation with proper error handling
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
            setMissionCreated(true);
            setDataToSubmit(null);
            // Reset no educators modal when new mission is created
            setNoEducatorsModalOpen(false);
          },
          onError: (error) => {
            console.error("Mission creation failed:", error);
            setMissionCreated(false);
            setDataToSubmit(null);
            setFindEducatorData({ coordinates: [], skills: [] });
          },
        }
      );
    }
  }, [dataToSubmit]);

  // Effect for refetching when distance changes
  useEffect(() => {
    if (
      findEducatorData?.coordinates.length &&
      findEducatorData?.skills.length &&
      missionCreated
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
      const educatorsIds =
        educatorsData?.data?.map((educator: any) => educator._id) || [];
      setInvitees(educatorsIds);

      // Close no educators modal if educators are found
      if (educatorsData && educatorsData?.data?.length > 0) {
        setNoEducatorsModalOpen(false);
      }
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
      missionCreated
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
    setMissionCreated(false);
    navigate("/dashboard", { replace: true });
  };

  const handleNoEducatorsModalClose = () => {
    setNoEducatorsModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    setMissionCreated(false);
  };

  const handleContactAdminModalClose = () => {
    setContactAdminModalOpen(false);
    setInvitees([]);
    setFindEducatorData({ coordinates: [], skills: [] });
    setDataToSubmit(null);
    setMissionCreated(false);
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
    educatorsData?.data?.forEach((educator: any) => {
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

  const isMissionCreationPhase =
    !missionCreated || !educatorsData?.data?.length;

  return (
    <Box sx={{ position: "relative" }}>
      {/* Radius dropdown positioned at top right - only show if mission was created */}
      {missionCreated && (
        <RadiusSlider
          distance={distance}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setDistance={setDistance}
          dropdownOpen={!!anchorEl}
        />
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
            Créer une mission
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
            Envoyer des invitations
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
          navigate(`/missions/${missionsData?.data?._id}`, { replace: true })
        }
        icon={<CheckCircleIcon />}
        title="Invitations envoyées avec succès !"
        description={`Les invitations ont été envoyées à ${invitees.length
          } éducateur${invitees.length !== 1 ? "s" : ""
          }. Vous serez informé dès qu'ils répondront.`}
        hasButton={true}
        hasButton1={true}
        buttonText="Fermer"
        button1Text="Voir le statut de l'invitation"
        hasAdditionalElements={false}
      />

      {/* No educators found modal */}
      <Modal
        open={noEducatorsModalOpen}
        onClose={handleNoEducatorsModalClose}
        onSubmit={handleContactAdmin}
        button1OnClick={handleExpandRadius}
        icon={<InfoIcon sx={{ color: "#FFA726" }} />}
        title="Aucun éducateur trouvé à proximité"
        description="Aucun éducateur n'est disponible dans votre rayon de recherche actuel. Vous pouvez essayer d'élargir le rayon pour atteindre plus d'éducateurs ou contacter notre équipe d'administration pour obtenir de l'aide."
        hasButton={true}
        hasButton1={true}
        buttonText="Contacter l'administration"
        button1Text="Élargir le rayon"
        hasAdditionalElements={false}
      />

      {/* Contact admin modal */}
      <Modal
        open={contactAdminModalOpen}
        onClose={handleSuccessModalClose}
        onSubmit={handleContactAdminModalClose}
        icon={<HelpOutlineIcon />}
        title="Besoin d'aide pour trouver des éducateurs ?"
        description="Contactez directement l'équipe d'administration pour obtenir de l'aide concernant votre mission, la disponibilité des éducateurs ou des questions techniques."
        hasButton={true}
        hasButton1={false}
        buttonText="Fermer"
        additionalElements={<ContactAdmin />}
        hasAdditionalElements={true}
      />
    </Box>
  );
};
