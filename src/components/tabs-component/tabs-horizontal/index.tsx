import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";

import { TabBar } from "./TabBar";
import { Main } from "./Main";

export const TabsHorizontal = ({
  tabs,
}: {
  tabs: { id: string; label: string; icon: any; component: React.ReactNode }[];
}) => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabChange = useCallback(
    (id: string) => {
      setSelectedTabId(id);
    },
    [] // no dependencies except setSelectedTabId, which is stable
  );

  const tabTitles = tabs.map(({ id, label, icon }) => ({ id, label, icon }));

  const selectedTabContent = tabs.find(
    (tab) => tab.id === selectedTabId
  )?.component;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tab Navigation */}
      <TabBar
        tabTitles={tabTitles}
        selectedTabId={selectedTabId}
        onTabChange={handleTabChange}
      />

      {/* Tab Content */}
      <Main
        selectedTabContent={selectedTabContent ?? null}
        key={selectedTabId}
      />
    </Box>
  );
};
