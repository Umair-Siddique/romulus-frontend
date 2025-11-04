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
import { useNavigate } from "react-router";
import { getStatusColor } from "#lib";

export const MissionsModal = ({
  open,
  onClose,
  date,
  missions,
}: MissionsModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

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
          height: "75vh",
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
              fontWeight: theme.typography.h3.fontWeight,
              color: "text.primary",
            }}
          >
            Missions le {date}
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
            flex: 1, // ← Take up remaining vertical space
            overflowY: "auto", // ← Enable vertical scroll
            py: 2,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {missions.map((mission, index) => (
            <Box
              key={mission.id}
              sx={{
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
                          fontWeight: theme.typography.h2.fontWeight,
                          color: "text.primary",
                        }}
                      >
                        {mission.branchName}
                      </Typography>
                      <Chip
                        label={mission.status}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          height: 20,
                          fontWeight: theme.typography.h3.fontWeight,
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
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      Heure: {mission.time}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  onClick={() =>
                    navigate(`/missions/${mission.id ?? mission._id}`)
                  }
                  sx={{
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: theme.typography.h3.fontWeight,
                    fontSize: "0.875rem",
                    minWidth: "auto",
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: theme.shape.borderRadius,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  Voir les détails
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
