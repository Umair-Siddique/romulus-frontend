import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  Assignment as MissionsIcon,
  School as TrainingIcon,
  Chat as ChatsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export const Sider = () => {
  const theme = useTheme();

  const navigationItems = [
    { text: "Missions", icon: <MissionsIcon />, active: true },
    { text: "Training", icon: <TrainingIcon />, active: false },
    { text: "Chats", icon: <ChatsIcon />, active: false },
    { text: "Settings", icon: <SettingsIcon />, active: false },
  ];

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        },
      }}
    >
      {/* Logo Section */}
      <Box p={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#2196f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              R
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#2196f3",
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            Romulus
          </Typography>
        </Stack>
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: 2 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              backgroundColor: item.active ? "#e3f2fd" : "transparent",
              "&:hover": {
                backgroundColor: item.active ? "#e3f2fd" : "#f5f5f5",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: item.active ? "#2196f3" : "#9e9e9e",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiTypography-root": {
                  color: item.active ? "#2196f3" : "#424242",
                  fontWeight: item.active ? 600 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Bottom Section */}
      <Box sx={{ mt: "auto", p: 2 }}>
        {/* Logout Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={{
            borderColor: "#f44336",
            color: "#f44336",
            mb: 2,
            textTransform: "none",
            "&:hover": {
              borderColor: "#f44336",
              backgroundColor: "#ffebee",
            },
          }}
        >
          Log-Out
        </Button>

        {/* Training Progress Card */}
        <Card
          sx={{
            backgroundColor: "#2196f3",
            color: "white",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Training Progress
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                opacity: 0.9,
              }}
            >
              Complete training to unlock missions.
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#4caf50",
                    borderRadius: 3,
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  opacity: 0.9,
                }}
              >
                50%
              </Typography>
            </Box>

            {/* Progress Items */}
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckIcon sx={{ fontSize: 16, mr: 1, color: "#4caf50" }} />
                <Typography variant="caption">
                  2 of 4 videos completed
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <UncheckedIcon sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
                <Typography variant="caption">Quiz not attempted</Typography>
              </Box>
            </Stack>

            {/* Resume Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#2196f3",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Resume Training
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
};
