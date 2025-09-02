import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";

import { TabBar } from "./tab-bar";
import { Main } from "./Main";

export const TabViewVertical = ({
  tabs,
}: {
  tabs: {
    id: string;
    label: string;
    icon: any;
    component: () => React.ReactNode;
    show: boolean;
  }[];
}) => {
  const theme = useTheme<Theme>();

  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabChange = useCallback((id: string) => {
    setSelectedTabId(id);
  }, []);

  const tabTitles = tabs.map(({ id, label, icon }) => ({
    id,
    label,
    icon,
  }));

  const selectedTabContent = tabs
    .find((tab) => tab.id === selectedTabId)
    ?.component();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Tab Navigation */}
      <TabBar
        tabTitles={tabTitles}
        selectedTabId={selectedTabId}
        onTabChange={handleTabChange}
      />

      {/* Divider */}
      <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}` }} />

      {/* Tab Content */}
      <Main
        selectedTabContent={selectedTabContent ?? null}
        key={selectedTabId}
      />
    </Box>
  );
};
