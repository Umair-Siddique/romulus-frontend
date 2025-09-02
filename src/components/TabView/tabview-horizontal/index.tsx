import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import { TabBar } from "./TabBar";
import { Main } from "./Main";

export const TabViewHorizontal = ({
  tabs,
}: {
  tabs: { id: string; label: string; icon: any; component: React.ReactNode }[];
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    [] // no dependencies except setSelectedTab, which is stable
  );

  const tabTitles = tabs.map(({ id, label, icon }) => ({ id, label, icon }));
  const tabContents = tabs.map(({ id, component }) => ({ id, component }));

  const selectedTabContent = tabContents[selectedTab]?.component ?? null;

  return (
    <Box>
      {/* Tab Navigation */}
      <TabBar
        tabsTitles={tabTitles}
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />

      {/* Tab Content */}
      <Main selectedTabContent={selectedTabContent ?? null} key={selectedTab} />
    </Box>
  );
};
