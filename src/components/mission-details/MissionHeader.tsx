import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCustom, useUpdate } from "@refinedev/core";
import { memo, useState, useCallback } from "react";
import { CheckCircle } from "@mui/icons-material";

import { Modal } from "../Modal";

export const MissionHeader = memo(
  ({
    role,
    missionData,
    refetch,
    refetchMission,
    showMarkAsCompletedButton,
  }: {
    role: string;
    missionData: any;
    refetch: () => void;
    refetchMission: () => void;
    showMarkAsCompletedButton: boolean;
  }) => {
    const theme = useTheme();

    const [response, setResponse] = useState<"accepted" | "declined" | "">("");
    const [modalOpen, setModalOpen] = useState(false);

    const { refetch: respondInvitation } = useCustom({
      method: "post",
      url: "/missions/respond-invitation",
      config: {
        headers: {
          "Content-Type": "application/json",
        },
        payload: {
          missionId: missionData.id,
          educatorId: missionData.educatorId,
          response: response,
          responseTime: new Date().toISOString(),
        },
      },
      queryOptions: {
        enabled: response !== "",
      },
      successNotification: () => {
        refetch();
        setResponse("");
        return undefined;
      },
    });

    const { mutate: updateMission } = useUpdate({
      resource: "missions",
      mutationMode: "optimistic",
      mutationOptions: {
        onSuccess: () => {
          refetchMission();
          setModalOpen(false);
        },
      },
    });

    const handleInvitationResponse = (response: "accepted" | "declined") => {
      setResponse(response);
      respondInvitation();
    };

    const openCompletionModal = useCallback(() => {
      setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
      setModalOpen(false);
    }, []);

    const handleMarkAsCompleted = useCallback(() => {
      updateMission({
        id: missionData.id,
        values: { status: "completed" },
      });
    }, [updateMission, missionData.id]);

    const shouldShowEducatorActions =
      missionData.invitationStatus === "pending" &&
      missionData.missionStatus !== "completed";

    const shouldShowOrganizationActions =
      showMarkAsCompletedButton && missionData.missionStatus !== "completed";

    const shouldShowAdminActions =
      missionData.invitationStatus !== "pending" &&
      missionData.missionStatus !== "completed";

    const renderActionButtons = () => {
      switch (role) {
        case "educator":
          return (
            shouldShowEducatorActions && (
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
                  onClick={() => handleInvitationResponse("declined")}
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    px: theme.spacing(3),
                    py: theme.spacing(1),
                    fontWeight: theme.typography.fontWeightMedium,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: theme.palette.error.main + "0a",
                    },
                  }}
                >
                  Decline Mission
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleInvitationResponse("accepted")}
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    px: theme.spacing(3),
                    py: theme.spacing(1),
                    fontWeight: theme.typography.fontWeightMedium,
                    textTransform: "none",
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Accept Mission
                </Button>
              </Box>
            )
          );
        case "organization":
          return (
            shouldShowOrganizationActions && (
              <Button
                variant="contained"
                onClick={openCompletionModal}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  px: theme.spacing(3),
                  py: theme.spacing(1),
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Mark as Completed
              </Button>
            )
          );
        case "admin":
          return (
            shouldShowAdminActions && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  px: theme.spacing(3),
                  py: theme.spacing(1),
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Assign Educator
              </Button>
            )
          );
      }
    };

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
            variant="h3"
            component="h1"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.text.primary,
              mb: theme.spacing(3),
              display: "flex",
              alignItems: "center",
            }}
          >
            Mission Overview
          </Typography>

          {renderActionButtons()}
        </Box>

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalClose}
          button1OnClick={handleMarkAsCompleted}
          icon={<CheckCircle />}
          title="Confirm Mission Completion"
          description="Are you sure you want to mark this mission as completed?"
          hasButton={true}
          hasButton1={true}
          buttonText="Close"
          button1Text="Complete Mission"
        />
      </>
    );
  }
);

MissionHeader.displayName = "MissionHeader";
