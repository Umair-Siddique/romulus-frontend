import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const MissionHeader = memo(
  ({ role, missionData }: { role: string; missionData: any }) => {
    const theme = useTheme();

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
                Reject Mission
              </Button>
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
          mb: theme.spacing(2),
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
