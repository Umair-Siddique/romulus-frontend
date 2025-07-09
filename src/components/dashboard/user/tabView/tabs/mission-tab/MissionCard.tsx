import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarTodayIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";

import { MissionCardProps } from "#types";
import { useUserContext } from "#context";

export const MissionCard = ({
  id,
  title,
  organizationName,
  branchName,
  date,
  time,
  branchAddress,
  status,
}: MissionCardProps) => {
  const { user } = useUserContext();
  const { role } = user;

  const theme = useTheme<Theme>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Selected action: ${action}`);
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        width: "48%",
        height: "auto",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        backgroundColor: theme.palette.background.default,
        p: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <Chip
          label={status}
          sx={{
            backgroundColor:
              status === "ongoing"
                ? "#fff3e0" // light orange
                : status === "pending"
                ? "#fff8e1" // light yellow
                : status === "completed"
                ? "#e8f5e9" // light green
                : status === "cancelled" || status === "rejected"
                ? "#ffebee" // light red
                : "#e3f2fd", // light blue

            color:
              status === "ongoing"
                ? "#ef6c00" // dark orange
                : status === "pending"
                ? "#f9a825" // amber/dark yellow
                : status === "completed"
                ? "#2e7d32" // dark green
                : status === "cancelled" || status === "rejected"
                ? "#c62828" // dark red
                : "#1565c0", // dark blue
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: theme.typography.caption.fontSize,
          }}
        />
      </Box>

      <CardContent sx={{ pt: theme.spacing(1) }}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            mb: theme.spacing(1),
            pr: theme.spacing(8),
            color: theme.palette.text.primary,
            textAlign: "left",
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {title}
        </Typography>

        <Stack spacing={theme.spacing(2)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <BusinessIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 22 }}
            />
            <Typography variant="body1" color="text.secondary">
              {organizationName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <BusinessIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {branchName}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <CalendarTodayIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <ScheduleIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {time}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <LocationOnIcon
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {branchAddress}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: theme.spacing(1),
            mt: theme.spacing(3),
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "none",
              fontWeight: theme.typography.fontWeightMedium,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            View Details
          </Button>

          {role !== "educator" && (
            <>
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: theme.shape.borderRadius,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleMenuItemClick("edit")}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("delete")}>
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
