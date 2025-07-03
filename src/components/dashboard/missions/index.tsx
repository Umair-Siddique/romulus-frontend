import { Box, Typography, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import KpiCard from "./KpiCard";
import {
  Assignment,
  AssignmentTurnedIn,
  Cancel,
  HourglassBottom,
  WatchLater,
  CalendarToday,
  ViewList,
} from "@mui/icons-material";

interface AdminDashboardProps {
  role: string;
  title: string;
  description: string;
}

// Placeholder components for different tab views
const CalendarView: React.FC = () => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">Calendar View</Typography>
    <Typography variant="body2" color="text.secondary">
      Calendar component will be loaded here
    </Typography>
  </Box>
);

const MissionsView: React.FC = () => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">Missions List View</Typography>
    <Typography variant="body2" color="text.secondary">
      Missions list component will be loaded here
    </Typography>
  </Box>
);

export const MissionsDashboard: React.FC<AdminDashboardProps> = ({
  title,
  description,
}) => {
  const theme = useTheme<Theme>();
  const [activeTab, setActiveTab] = useState(0);

  const kpiCardsData = [
    {
      title: "Total",
      total: 120,
      icon: <Assignment sx={{ color: "#1976d2", fontSize: "1.5rem" }} />,
      iconBg: "#e3f2fd",
    },
    {
      title: "Ongoing",
      total: 35,
      icon: <HourglassBottom sx={{ color: "#ff9800", fontSize: "1.5rem" }} />,
      iconBg: "#fff3e0",
    },
    {
      title: "Pending",
      total: 50,
      icon: <WatchLater sx={{ color: "#ffc107", fontSize: "1.5rem" }} />,
      iconBg: "#fff8e1",
    },
    {
      title: "Completed",
      total: 85,
      icon: (
        <AssignmentTurnedIn sx={{ color: "#4caf50", fontSize: "1.5rem" }} />
      ),
      iconBg: "#e8f5e9",
    },
    {
      title: "Cancelled",
      total: 15,
      icon: <Cancel sx={{ color: "#f44336", fontSize: "1.5rem" }} />,
      iconBg: "#ffebee",
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CalendarView />;
      case 1:
        return <MissionsView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: theme.typography.h3.fontWeight,
          mb: theme.spacing(1),
          color: theme.palette.text.primary,
          fontSize: { xs: "1.75rem", md: "2rem" },
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
          fontSize: "0.9375rem",
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
        width="100%"
        justifyContent="space-between"
      >
        {kpiCardsData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            total={kpi.total}
            icon={kpi.icon}
            iconBg={kpi.iconBg}
          />
        ))}
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mt: 4, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              minHeight: 48,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab
            icon={<CalendarToday sx={{ fontSize: "1.25rem" }} />}
            label="Calendar"
            iconPosition="start"
          />
          <Tab
            icon={<ViewList sx={{ fontSize: "1.25rem" }} />}
            label="Missions"
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 0 }}>
        {renderTabContent()}
      </Box>
    </>
  );
};