import { Box } from "@mui/material";

import { TabList } from "./TabList";

export const TabsSidebar = ({
  tabTitles,
  onTabSelection,
  selectedTab,
}: {
  tabTitles: any[];
  onTabSelection: (id: string) => void;
  selectedTab: string;
}) => {
  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <TabList
        tabTitles={tabTitles}
        onTabSelection={onTabSelection}
        selectedTab={selectedTab}
      />
    </Box>
  );
};
