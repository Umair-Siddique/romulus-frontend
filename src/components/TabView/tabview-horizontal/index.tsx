import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import { TabBar } from "./TabBar";
import { Main } from "./Main";

export const TabViewHorizontal = ({
  tabs,
}: {
  tabs: { id: string; label: string; icon: any; component: React.ReactNode }[];
}) => {
  const [selectedTabId, setSelectedTabId] = useState(0);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTabId(newValue);
    },
    [] // no dependencies except setSelectedTabId, which is stable
  );

  const tabTitles = tabs.map(({ id, label, icon }) => ({ id, label, icon }));
  const tabContents = tabs.map(({ id, component }) => ({ id, component }));

  const selectedTabContent = tabContents[selectedTabId]?.component ?? null;

  return (
    <Box>
      {/* Tab Navigation */}
      <TabBar
        tabTitles={tabTitles}
        selectedTabId={selectedTabId}
        handleTabChange={handleTabChange}
      />

      {/* Tab Content */}
      <Main
        selectedTabContent={selectedTabContent ?? null}
        key={selectedTabId}
      />
    </Box>
  );
};
