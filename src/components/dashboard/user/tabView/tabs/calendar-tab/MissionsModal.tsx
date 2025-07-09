import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { MissionsModalProps } from "#types";

export const MissionsModal = ({
  open,
  onClose,
  date,
  missions,
}: MissionsModalProps) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return { color: "#ef6c00", backgroundColor: "#fff3e0" }; // dark orange
      case "pending":
        return { color: "#f9a825", backgroundColor: "#fff8e1" }; // amber/dark yellow
      case "completed":
        return { color: "#2e7d32", backgroundColor: "#e8f5e9" }; // dark green
      case "cancelled":
      case "rejected":
        return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
      default:
        return { color: "#1565c0", backgroundColor: "#e3f2fd" }; // dark blue
    }
  };

  console.log("Missions Modal - missions:", missions);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          borderRadius: theme.shape.borderRadius,
          boxShadow: 24,
          width: "800px",
          maxHeight: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            p: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Missions on {date}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
            width: "100%",
            gap: 2,
          }}
        >
          {missions.map((mission, index) => (
            <Box
              key={mission.id}
              sx={{
                marginTop: index === 0 ? 10 : 0,
                width: "95%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 3,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                      mr: 2,
                    }}
                  >
                    <BusinessIcon
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {mission.title}
                      </Typography>
                      <Chip
                        label={mission.status}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          height: 20,
                          fontWeight: 500,
                          ...getStatusColor(mission.status),
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      Mission: {mission.title}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  View Details
                </Button>
              </Box>
              {index < missions.length - 1 && <Divider sx={{ mx: 3 }} />}
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
