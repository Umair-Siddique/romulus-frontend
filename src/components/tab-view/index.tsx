import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const TabView = () => {
  const theme = useTheme<Theme>();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
              fontWeight: theme.typography.h3.fontWeight,
              fontSize: "0.875rem",
              minHeight: 48,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
                fontWeight: theme.typography.h2.fontWeight,
              },
            },
          }}
        >
          <Tab label="Invited Educators" />
          <Tab label="Hired Educators" />
          <Tab label="Rejected Educators" />
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
          <h1>Tab 1</h1>
        ) : activeTab === 1 ? (
          <h1>Tab 2</h1>
        ) : (
          <h1>Tab 3</h1>
        )}
      </Box>
    </>
  );
};
