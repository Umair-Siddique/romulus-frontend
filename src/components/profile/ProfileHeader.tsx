import { useUserContext } from "#context";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCustom, useOne, useUpdate } from "@refinedev/core";
import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { CheckCircle, Cancel, PersonOff } from "@mui/icons-material";

import { Modal } from "../Modal";
import { formatDate, formatTime } from "#utils";

interface ProfileHeaderProps {
  role: string;
  educatorId: string;
  missionId: string;
  educatorData?: any; // Adjust type as necessary
}

export const ProfileHeader = memo<ProfileHeaderProps>(
  ({ role, educatorId, missionId, educatorData }) => {
    const theme = useTheme();
    const userContext = useUserContext();
    const organizationId = userContext?.user?.organizationId;
    const refetchUserProfile = userContext?.refetchUserProfile;

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<
      "hired" | "rejected" | "inactive" | null
    >(null);

    const { data: missionData, refetch: refetchMissionData } = useCustom({
      url: `/missions/${missionId}/${role}/${organizationId}`,
      method: "get",
      queryOptions: {
        enabled: !!missionId,
      },
    });

    const { mutate: updateMission } = useUpdate({
      resource: "missions",
      mutationMode: "optimistic",
      mutationOptions: {
        onSuccess: () => {
          refetchUserProfile && refetchUserProfile();
          refetchMissionData();
          setModalOpen(false);
          setModalAction(null);
        },
      },
    });

    const hiredEducators = missionData?.data?.hiredEducators;
    const rejectedEducators = missionData?.data?.rejectedEducators;

    const isHiredOrRejected =
      hiredEducators?.includes(educatorId) ||
      rejectedEducators?.includes(educatorId);

    const [invitationStatus, setInvitationStatus] = useState<string>("pending");

    useEffect(() => {
      const invitationStatus = educatorData?.missionsInvitedFor?.find(
        (elem: any) => elem?.mission?._id === missionId
      )?.invitationStatus;

      setInvitationStatus(invitationStatus);
    }, [educatorData?.missionsInvitedFor]);

    // Memoize button styles
    const buttonStyles = useMemo(
      () => ({
        base: {
          borderRadius: theme.shape.borderRadius,
          px: theme.spacing(3),
          py: theme.spacing(1),
          fontWeight: theme.typography.fontWeightMedium,
          textTransform: "none" as const,
        },
        primary: {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        error: {
          "&:hover": {
            backgroundColor: theme.palette.error.main + "0a",
          },
        },
      }),
      [theme]
    );

    const handleHireStatusChange = useCallback(
      (status: "hired" | "rejected") => {
        updateMission({
          id: missionId,
          values: { hireStatus: status, educatorId },
        });
      },
      [updateMission, missionId, educatorId]
    );

    const handleInactiveAction = useCallback(() => {
      // Add your inactive logic here
      console.log("Making educator inactive");
      setModalOpen(false);
      setModalAction(null);
    }, []);

    const openModal = useCallback(
      (action: "hired" | "rejected" | "inactive") => {
        setModalAction(action);
        setModalOpen(true);
      },
      []
    );

    const handleModalSubmit = useCallback(() => {
      if (modalAction === "hired" || modalAction === "rejected") {
        handleHireStatusChange(modalAction);
      } else if (modalAction === "inactive") {
        handleInactiveAction();
      }
    }, [modalAction, handleHireStatusChange, handleInactiveAction]);

    const handleModalClose = useCallback(() => {
      setModalOpen(false);
      setModalAction(null);
    }, []);

    const date = new Date();

    const now = {
      time: formatTime(date.toISOString().split("T")[1].split(".")[0]),
      date: formatDate(date.toISOString()),
    };

    const getModalContent = useMemo(() => {
      switch (modalAction) {
        case "hired":
          return {
            icon: <CheckCircle />,
            title: "Hire Educator",
            description: `You're about to officailly hire **${educatorData?.firstName} ${educatorData?.lastName}** for the mission **"${missionData?.data?.title}"** on **${now.date}** at **${now.time}**. Once confirmed, this educator will be notified and the mission status will be updated.`,
            buttonText: "Hire",
          };
        case "rejected":
          return {
            icon: <Cancel />,
            title: "Reject Educator",
            description:
              "Are you sure you want to reject this educator? This action cannot be undone.",
            buttonText: "Reject",
          };
        case "inactive":
          return {
            icon: <PersonOff />,
            title: "Make Inactive",
            description:
              "Are you sure you want to make this educator inactive? This will restrict their access.",
            buttonText: "Make Inactive",
          };
        default:
          return {
            icon: <CheckCircle />,
            title: "",
            description: "",
            buttonText: "Confirm",
          };
      }
    }, [modalAction]);

    // console.log("ProfileHeader -> missionData:", missionData);
    // console.log("ProfileHeader -> role:", role);
    // console.log("ProfileHeader -> invitationStatus:", invitationStatus);
    // console.log("ProfileHeader -> isHiredOrRejected:", isHiredOrRejected);

    const renderActionButtons = useCallback(() => {
      if (
        hiredEducators?.length < 1 &&
        role === "organization" &&
        invitationStatus === "accepted" &&
        !isHiredOrRejected
      ) {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => openModal("rejected")}
              sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            >
              Reject Educator
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => openModal("hired")}
              sx={{ ...buttonStyles.base, ...buttonStyles.primary }}
            >
              Hire Educator
            </Button>
          </Box>
        );
      }

      if (role === "admin") {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ ...buttonStyles.base, ...buttonStyles.primary }}
            >
              Edit Info
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => openModal("inactive")}
              sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            >
              Inactive
            </Button>
          </Box>
        );
      }

      return null;
    }, [
      role,
      invitationStatus,
      isHiredOrRejected,
      theme,
      buttonStyles,
      openModal,
    ]);

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.grey[400],
              display: "flex",
              alignItems: "center",
              fontSize: theme.typography.h5.fontSize,
            }}
          >
            Personal Info
          </Typography>

          {renderActionButtons()}
        </Box>

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalClose}
          button1OnClick={handleModalSubmit}
          icon={getModalContent.icon}
          title={getModalContent.title}
          description={getModalContent.description}
          hasButton={true}
          hasButton1={true}
          buttonText="Close"
          button1Text={getModalContent.buttonText}
        />
      </>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";
