import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

import { TabBar } from "./TabBar";
import { Main } from "./Main";

export const TabViewHorizontal = ({
  tabsTitles,
  tabsContent,
}: {
  tabsTitles: string[];
  tabsContent: React.ReactNode[];
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    [] // no dependencies except setSelectedTab, which is stable
  );

  const selectedTabContent = tabsContent[selectedTab] ?? null;

  return (
    <Box>
      {/* Tab Navigation */}
      <TabBar
        tabsTitles={tabsTitles}
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />

      {/* Tab Content */}
      <Main selectedTabContent={selectedTabContent ?? null} />
    </Box>
  );
};
