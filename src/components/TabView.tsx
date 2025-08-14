import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const TabView = ({
  tabsTitles,
  tabsContent,
}: {
  tabsTitles: string[];
  tabsContent: React.ReactNode[];
}) => {
  const theme = useTheme<Theme>();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* Tab Navigation */}
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
          {tabsTitles.map((title, index) => (
            <Tab key={index} label={title} />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          textAlign: "center",
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: theme.shape.borderRadius,
          marginTop: 2,
        }}
      >
        {tabsContent[activeTab]}
      </Box>
    </>
  );
};
