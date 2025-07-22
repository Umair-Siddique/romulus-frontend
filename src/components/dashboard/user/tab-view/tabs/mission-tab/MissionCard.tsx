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
import { toZonedTime, format } from "date-fns-tz";

import { MissionCardProps } from "#types";
import { useUserContext } from "#context";
import { useNavigate } from "react-router";
import { formatDate, formatTime, getStatusColor } from "#utils";
import { useDelete } from "@refinedev/core";

export const MissionCard = ({
  _id,
  title,
  organizationName,
  branchName,
  date,
  time,
  branchAddress,
  status,
  refetch,
}: MissionCardProps) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const { mutate: deleteMission } = useDelete();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMision = () => {
    deleteMission(
      {
        resource: "missions",
        id: _id,
        successNotification: {
          message: "Mission deleted successfully",
          type: "success",
        },
      },
      {
        onSuccess: () => {
          handleMenuClose();
          refetch();
        },
        onError: (error) => {
          console.log("Error deleting mission:", error);
          handleMenuClose();
        },
      }
    );
  };

  // Extract the date part only
  const dateOnly = date.split("T")[0]; // "2025-07-21"

  // Extract start and end times
  const [startTime, endTime] = time.split(" - "); // "19:00", "07:00"

  // Get the browser's time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Construct ISO timestamps for both
  const startUtcTimestamp = new Date(`${dateOnly}T${startTime}:00Z`);
  const endUtcDate = new Date(`${dateOnly}T${endTime}:00Z`);

  // Handle potential day rollover (e.g. 07:00 is next day if end < start)
  if (endTime < startTime) {
    endUtcDate.setUTCDate(endUtcDate.getUTCDate() + 1);
  }

  // Convert to local time zone
  const localStartDate = toZonedTime(startUtcTimestamp, timeZone);
  const localEndDate = toZonedTime(endUtcDate, timeZone);

  // Format both times
  const formattedStart = format(localStartDate, "hh:mm a", {
    timeZone,
  }).toLowerCase();
  const formattedEnd = format(localEndDate, "hh:mm a", {
    timeZone,
  }).toLowerCase();

  console.log("Start:", formattedStart);
  console.log("End:", formattedEnd);

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
            ...getStatusColor(status), // Use utility function to get status color
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
              {formatDate(date)}
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
              {formattedStart} to {formattedEnd}
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
            onClick={() => navigate(`/missions/${_id}`)}
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
                <MenuItem onClick={handleDeleteMision}>Delete</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
