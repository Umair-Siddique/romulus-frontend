import {
  BusinessOutlined as OrganizationIcon, // Organization
  CalendarTodayOutlined as DateIcon, // Date
  AccessTimeOutlined as TimeIcon, // Time
  AccountTreeOutlined as BranchIcon, // Branch Name
  LocationOnOutlined as LocationIcon, // Location
  LabelOutlined as StatusIcon, // Status (generic tag icon)
} from "@mui/icons-material";

import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Stack, Typography } from "@mui/material";

import { getStatusColor } from "#lib";

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
        {label === "Status" ? (
          <Chip
            label={value}
            size="small"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              ...getStatusColor(value),
            }}
          />
        ) : (
          <Typography variant="body1" color="text.primary">
            {value}
          </Typography>
        )}
      </Box>
    );
  }
);

export const MissionDetails = memo(({ missionData }: { missionData: any }) => {
  const theme = useTheme();

  const displayData = [
    {
      id: 1,
      icon: OrganizationIcon,
      label: "Organisation",
      value: missionData.organizationName,
    },
    {
      id: 2,
      icon: DateIcon,
      label: "Date",
      value: missionData.missionDate,
    },
    { id: 3, icon: TimeIcon, label: "Heure", value: missionData.missionTime },
    {
      id: 4,
      icon: BranchIcon,
      label: "Nom de la Branche",
      value: missionData.branchName,
    },
    {
      id: 5,
      icon: LocationIcon,
      label: "Emplacement",
      value: missionData.missionLocation,
    },
    {
      id: 6,
      icon: StatusIcon,
      label: "Statut",
      value: missionData.missionStatus,
    },
  ];

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
        {displayData.map((item) => (
          <MissionDetailItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </Stack>
    </Box>
  );
});

MissionDetails.displayName = "MissionDetails";
