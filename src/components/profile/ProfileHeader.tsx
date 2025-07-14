import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const ProfileHeader = memo(({ role }: { role: string }) => {
  const theme = useTheme();

  const renderActionButtons = () => {
    switch (role) {
      case "organization":
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
              Reject Educator
            </Button>
            <Button
              variant="contained"
              color="primary"
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
              Hire Educator
            </Button>
          </Box>
        );
      case "admin":
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
              Edit Info
            </Button>
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
              Inactive
            </Button>
          </Box>
        );
    }
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
        variant="h6"
        component="h6"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.secondary,
          mb: theme.spacing(3),
          display: "flex",
          alignItems: "center",
        }}
      >
        Personal Info
      </Typography>

      {renderActionButtons()}
    </Box>
  );
});

ProfileHeader.displayName = "ProfileHeader";
