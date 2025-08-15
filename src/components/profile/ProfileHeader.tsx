import { useUserContext } from "#context";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCustom, useUpdate } from "@refinedev/core";
import { useMemo, useCallback, useState, useEffect } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";

import { Modal } from "../Modal";
import { formatDate, formatTime } from "#utils";
import { useNavigate } from "react-router";

interface ProfileHeaderProps {
  role: string;
  educatorId?: string;
  organizationIdProp?: string;
  missionId: string;
  educatorData?: any; // Adjust type as necessary
  refetchEducatorData?: () => void;
  refetchOrganizationData?: () => void;
  parentComponent?: string;
  reportId?: string;
  showViewDetails?: boolean;
}

export const ProfileHeader = ({
  role,
  educatorId,
  organizationIdProp,
  missionId,
  educatorData,
  refetchOrganizationData,
  parentComponent,
  reportId,
  showViewDetails,
}: ProfileHeaderProps) => {
  const theme = useTheme();

  const userContext = useUserContext();
  const organizationId =
    organizationIdProp || userContext?.user?.organizationId;
  const refetchUserProfile = userContext?.refetchUserProfile;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    | "hired"
    | "rejected"
    | "active"
    | "inactive"
    | "resolved"
    | "dismissed"
    | null
  >(null);

  const { data: missionData, refetch: refetchMissionData } = useCustom({
    url: `/missions${
      role === "admin" ? "" : `/${missionId}/${role}/${organizationId}`
    }`,
    method: "get",
    queryOptions: {
      enabled: !!missionId,
    },
  });

  const navigate = useNavigate();

  const updateUserResource = educatorId ? "educators" : "organizations";
  const updateRoleId =
    updateUserResource === "educators" ? educatorId : organizationIdProp;

  const { mutate: updateUser } = useUpdate({
    resource: updateUserResource,
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        refetchOrganizationData && refetchOrganizationData();
        refetchMissionData && refetchMissionData();
        refetchUserProfile && refetchUserProfile();

        setModalOpen(false);
        setModalAction(null);
      },
    },
  });

  const { mutate: updateMission } = useUpdate({
    resource: "missions",
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        refetchUserProfile && refetchUserProfile();
        refetchMissionData && refetchMissionData();
        refetchOrganizationData && refetchOrganizationData();

        setModalOpen(false);
        setModalAction(null);
      },
    },
  });

  const { mutate: updateReport } = useUpdate({
    resource: "reports",
    mutationMode: "optimistic",
    mutationOptions: {
      onSuccess: () => {
        refetchUserProfile && refetchUserProfile();
        refetchMissionData && refetchMissionData();
        refetchOrganizationData && refetchOrganizationData();

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

  const handleActivationStatusChange = useCallback(
    (status: "active" | "inactive") => {
      updateUser({
        id: updateRoleId,
        values: { status },
      });

      setModalOpen(false);
      setModalAction(null);
    },
    [
      updateUser,
      updateRoleId,
      refetchOrganizationData,
      refetchMissionData,
      refetchUserProfile,
    ]
  );

  const handleReportStatusChange = useCallback(
    (status: "resolved" | "dismissed") => {
      updateReport({
        id: reportId,
        values: { reportStatus: status },
      });

      setModalOpen(false);
      setModalAction(null);
    },
    [updateReport, reportId]
  );

  const openModal = useCallback(
    (
      action:
        | "hired"
        | "rejected"
        | "active"
        | "inactive"
        | "resolved"
        | "dismissed"
    ) => {
      setModalAction(action);
      setModalOpen(true);
    },
    []
  );

  const handleModalSubmit = useCallback(() => {
    if (modalAction === "hired" || modalAction === "rejected") {
      handleHireStatusChange(modalAction);
    } else if (modalAction === "active" || modalAction === "inactive") {
      handleActivationStatusChange(modalAction);
    } else if (modalAction === "resolved" || modalAction === "dismissed") {
      handleReportStatusChange(modalAction);
    }
  }, [modalAction, handleHireStatusChange, handleActivationStatusChange]);

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
      case "active":
        return {
          icon: <CheckCircle />,
          title: "Active Educator",
          description: `Are you sure you want to active this educator? This action cannot be undone.`,
          buttonText: "Active",
        };
      case "inactive":
        return {
          icon: <Cancel />,
          title: "Inactive Educator",
          description: `Are you sure you want to inactive this educator? This action cannot be undone.`,
          buttonText: "Inactive",
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

  const renderActionButtons = useCallback(() => {
    if (
      hiredEducators?.length < 1 &&
      role === "organization" &&
      invitationStatus === "accepted" &&
      !isHiredOrRejected &&
      educatorData?.availableForHiring &&
      !showViewDetails
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

    const activationStatus = educatorData?.status;

    if (role === "admin" && parentComponent !== "reports" && !showViewDetails) {
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
            onClick={() => openModal("active")}
            disabled={activationStatus === "active"}
          >
            Active
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => openModal("inactive")}
            sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            disabled={activationStatus === "inactive"}
          >
            Inactive
          </Button>
        </Box>
      );
    }

    if (role === "admin" && parentComponent === "reports" && !showViewDetails) {
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
            onClick={() => openModal("resolved")}
            disabled={activationStatus === "resolved"}
          >
            Resolve
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => openModal("dismissed")}
            sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            disabled={activationStatus === "dismissed"}
          >
            Dismiss
          </Button>
        </Box>
      );
    }

    if (showViewDetails) {
      return (
        <Button
          variant="outlined"
          onClick={() => navigate(`/educators/${educatorId}`)}
        >
          View Details
        </Button>
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
          {parentComponent === "reports" && educatorId
            ? "Educator Info"
            : "Organization Info"}
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
};

ProfileHeader.displayName = "ProfileHeader";
