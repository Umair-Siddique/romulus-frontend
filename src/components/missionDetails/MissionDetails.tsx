import {
  AccessTime,
  Business,
  CalendarToday,
  LocationOn,
} from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

const MissionDetailItem = memo(
  ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
  }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(2),
        }}
      >
        <Icon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            width: "105px",
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          {label}:
        </Typography>
        <Typography variant="body1" color="text.primary">
          {value}
        </Typography>
      </Box>
    );
  }
);

MissionDetailItem.displayName = "MissionDetailItem";

export const MissionDetails = memo(
  ({
    missionData,
    getStatusColor,
  }: {
    missionData: any;
    getStatusColor: (status: string) => any;
  }) => {
    const theme = useTheme();

    return (
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.primary,
            mb: theme.spacing(2),
          }}
        >
          {missionData.missionTitle}
        </Typography>

        <Stack spacing={theme.spacing(1.5)}>
          <MissionDetailItem
            icon={Business}
            label="Organization"
            value={missionData.organizationName}
          />
          <MissionDetailItem
            icon={CalendarToday}
            label="Date"
            value={missionData.missionDate}
          />
          <MissionDetailItem
            icon={AccessTime}
            label="Time"
            value={missionData.missionTime}
          />
          <MissionDetailItem
            icon={Business}
            label="Branch Name"
            value={missionData.branchName}
          />
          <MissionDetailItem
            icon={LocationOn}
            label="Location"
            value={missionData.missionLocation}
          />
          <MissionDetailItem
            icon={LocationOn}
            label="Address"
            value={missionData.branchAddress}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: "140px",
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              Status:
            </Typography>
            <Chip
              label={missionData.missionStatus}
              size="small"
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                ...getStatusColor(missionData.missionStatus),
              }}
            />
          </Box>
        </Stack>
      </Box>
    );
  }
);

MissionDetails.displayName = "MissionDetails";
