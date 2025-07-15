import { useUserContext } from "#context";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useOne, useUpdate } from "@refinedev/core";
import { memo, useMemo, useCallback } from "react";

interface ProfileHeaderProps {
  role: string;
  educatorId: string;
  missionId: string;
}

export const ProfileHeader = memo<ProfileHeaderProps>(
  ({ role, educatorId, missionId }) => {
    const theme = useTheme();
    const userContext = useUserContext();
    const organizationId = userContext?.user?.organizationId;
    const refetchUserProfile = userContext?.refetchUserProfile;

    const { data: missionData } = useOne({
      resource: `missions/${missionId}/${role}/${organizationId}`,
      queryOptions: {
        enabled: !!missionId,
      },
    });

    const { data: educatorData } = useOne({
      resource: `educators/${educatorId}`,
      queryOptions: {
        enabled: !!educatorId,
      },
    });

    const { mutate: updateMission } = useUpdate({
      resource: "missions",
      mutationMode: "optimistic",
      mutationOptions: {
        onSuccess: () => {
          refetchUserProfile && refetchUserProfile();
        },
      },
    });

    const invitationStatus = educatorData?.data?.missionsInvitedFor?.find(
      (elem: any) => elem.mission._id === missionId
    )?.invitationStatus;

    // Memoize educator status check
    const isPendingEducator = useMemo(() => {
      if (!missionData?.data) return false;

      const { hiredEducators = [], rejectedEducators = [] } = missionData.data;
      return (
        hiredEducators.includes(educatorId) ||
        rejectedEducators.includes(educatorId)
      );
    }, [missionData?.data, educatorId]);

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

    const renderActionButtons = useCallback(() => {
      if (
        role === "organization" &&
        invitationStatus === "accepted" &&
        !isPendingEducator
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
              onClick={() => handleHireStatusChange("rejected")}
              sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            >
              Reject Educator
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleHireStatusChange("hired")}
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
              sx={{ ...buttonStyles.base, ...buttonStyles.error }}
            >
              Inactive
            </Button>
          </Box>
        );
      }

      return null;
    }, [role, isPendingEducator, theme, buttonStyles, handleHireStatusChange]);

    return (
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
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";
