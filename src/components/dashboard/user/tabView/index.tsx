import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  CalendarToday as CalendarTodayIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";

import { CalendarTab, MissionsTab } from "./tabs";
import {
  CalendarTabDataProps,
  MissionsTabsDataProps,
} from "#types";

interface TabsViewProps {
  missions: any[];
}

export const TabsView = ({ missions }: TabsViewProps) => {
  const theme = useTheme<Theme>();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const calendarTabProps: CalendarTabDataProps[] = missions.map((mission) => ({
    id: mission._id,
    title: mission.title || "No Title",
    organizationName:
      mission.organization?.organizationName || "No Organization",
    branchName: mission.branch || "No Branch",
    date: mission.start || "No Date",
    status: mission.status || "No Status",
  }));

  const missionsTabProps: MissionsTabsDataProps[] = missions.map((mission) => ({
    id: mission._id,
    title: mission.title || "No Title",
    organizationName:
      mission.organization?.organizationName || "No Organization",
    branchName: mission.branch || "No Branch",
    date: mission.start || "No Date",
    time:
      `${mission.start.split("T")[1].slice(0, 5)} - ${mission.end
        .split("T")[1]
        .slice(0, 5)}` || "No Time",
    branchAddress:
      mission.organization?.branches?.find(
        (branch: any) => branch.branchName === mission.branch
      )?.branchAddress || "No Address",
    status: mission.status || "No Status",
  }));

  return (
    <>
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
            icon={<CalendarTodayIcon sx={{ fontSize: "1.25rem" }} />}
            label="Calendar"
            iconPosition="start"
          />
          <Tab
            icon={<ViewListIcon sx={{ fontSize: "1.25rem" }} />}
            label="Missions"
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: theme.shape.borderRadius,
          marginTop: 2,
        }}
      >
        {activeTab === 0 ? (
          <CalendarTab calendarTabProps={calendarTabProps} />
        ) : (
          <MissionsTab missionsTabProps={missionsTabProps} />
        )}
      </Box>
    </>
  );
};
