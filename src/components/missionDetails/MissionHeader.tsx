import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCustom } from "@refinedev/core";
import { memo, useEffect, useState } from "react";

export const MissionHeader = memo(
  ({
    role,
    missionData,
    refetch,
  }: {
    role: string;
    missionData: any;
    refetch: () => void;
  }) => {
    const theme = useTheme();

    const [response, setResponse] = useState<"accepted" | "declined" | "">("");

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
        },
      },
      queryOptions: {
        enabled: false,
      },
    });

    useEffect(() => {
      if (response) {
        refetch();
      }
    }, [response, refetch]);

    const handleInvitationResponse = (response: "accepted" | "declined") => {
      setResponse(response);
      respondInvitation();
    };

    const renderActionButtons = () => {
      if (role === "educator") {
        return (
          missionData.invitationStatus === "pending" &&
          missionData.missionStatus !== "completed" && (
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
      }

      if (role === "organization") {
        return (
          missionData.missionStatus !== "completed" && (
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
              Mark as Completed
            </Button>
          )
        );
      }

      if (role === "admin") {
        return (
          missionData.invitationStatus !== "pending" &&
          missionData.missionStatus !== "completed" && (
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

      return null;
    };

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
    );
  }
);

MissionHeader.displayName = "MissionHeader";
