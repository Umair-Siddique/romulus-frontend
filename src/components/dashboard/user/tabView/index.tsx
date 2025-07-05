import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { CalendarToday, ViewList } from "@mui/icons-material";

import { CalendarTab, MissionsTab } from "./tabs";

export const TabsView = () => {
  const theme = useTheme<Theme>();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const missions = [
    {
      id: "1",
      title: "Science Fair Coordination",
      venue: "The Learning Hub",
      location: "Downton",
      date: "12 May, 2025",
      time: "01:00 pm to 04:00 pm",
      address: "Aston, USA",
      status: "Pending",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CalendarTab missions={missions} />;
      case 1:
        return <MissionsTab missions={missions} />;
      default:
        return <CalendarTab missions={missions} />;
    }
  };

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
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: theme.shape.borderRadius,
          marginTop: 2,
        }}
      >
        {renderTabContent()}
      </Box>
    </>
  );
};
