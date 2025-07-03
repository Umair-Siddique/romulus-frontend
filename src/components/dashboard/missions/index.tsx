import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import KpiCard from "./KpiCard";
import {
  Assignment,
  AssignmentTurnedIn,
  Cancel,
  HourglassBottom,
  WatchLater,
} from "@mui/icons-material";

interface AdminDashboardProps {
  role: string;
  title: string;
  description: string;
}

export const MissionsDashboard: React.FC<AdminDashboardProps> = ({
  title,
  description,
}) => {
  const theme = useTheme<Theme>();

  const kpiCardData = [
    {
      title: "Total",
      total: 120,
      icon: <Assignment sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue - neutral/informational
      iconBg: "#e3f2fd", // Light blue background
    },
    {
      title: "Ongoing",
      total: 35,
      icon: <HourglassBottom sx={{ color: "#ff9800", fontSize: "1.5rem" }} />, // Orange - in progress
      iconBg: "#fff3e0", // Light orange background
    },
    {
      title: "Pending",
      total: 50,
      icon: <WatchLater sx={{ color: "#ffc107", fontSize: "1.5rem" }} />, // Amber - waiting/caution
      iconBg: "#fff8e1", // Light amber background
    },
    {
      title: "Completed",
      total: 85,
      // Green - success/completed
      icon: (
        <AssignmentTurnedIn sx={{ color: "#4caf50", fontSize: "1.5rem" }} />
      ),
      iconBg: "#e8f5e9", // Light green background
    },
    {
      title: "Cancelled",
      total: 15,
      icon: <Cancel sx={{ color: "#f44336", fontSize: "1.5rem" }} />, // Red - error/cancelled
      iconBg: "#ffebee", // Light red background
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: theme.typography.h3.fontWeight,
          mb: theme.spacing(1),
          color: theme.palette.text.primary,
          fontSize: { xs: "1.75rem", md: "2rem" }, // 28px and 32px equivalents using rem
          fontFamily: theme.typography.h4.fontFamily,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: theme.spacing(1),
          fontSize: "0.9375rem", // 15px equivalent using rem (15/16 = 0.9375)
          lineHeight: theme.typography.body1.lineHeight,
          fontFamily: theme.typography.body1.fontFamily,
        }}
      >
        {description}
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        mt={2}
        width="100%" // Full width
        justifyContent="space-between" // Equal spacing across full width
      >
        {kpiCardData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            total={kpi.total}
            icon={kpi.icon}
            iconBg={kpi.iconBg}
          />
        ))}
      </Box>
    </>
  );
};
