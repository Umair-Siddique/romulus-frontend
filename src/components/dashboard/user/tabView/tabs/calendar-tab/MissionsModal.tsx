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
import { Close, Business, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface Mission {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

interface MissionsModalProps {
  open: boolean;
  onClose: () => void;
  date: string;
  missions: Mission[];
}

export const MissionsModal: React.FC<MissionsModalProps> = ({
  open,
  onClose,
  date,
  missions,
}) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return { color: "#1976d2", backgroundColor: "#e3f2fd" };
      case "New":
        return { color: "#d32f2f", backgroundColor: "#ffebee" };
      case "Completed":
        return { color: "#2e7d32", backgroundColor: "#e8f5e8" };
      case "Pending":
        return { color: "#ed6c02", backgroundColor: "#fff4e6" };
      default:
        return { color: "#666", backgroundColor: "#f5f5f5" };
    }
  };

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
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          width: { xs: "90%", sm: "500px" },
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
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
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
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 0,
          }}
        >
          {missions.map((mission, index) => (
            <Box key={mission.id}>
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
                    <Business sx={{ color: "text.secondary", fontSize: 20 }} />
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
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
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
