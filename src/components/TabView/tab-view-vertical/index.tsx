import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { TabsSidebar } from "./tabs-sidebar";
import { TabsMain } from "./TabsMain";

export const TabViewVertical = ({
  tabTitles,
  tabsContent,
}: {
  tabTitles: any[];
  tabsContent: React.ReactNode[];
}) => {
  const theme = useTheme<Theme>();

  const [selectedTab, setSelectedTab] = useState(tabTitles[0].id);

  const handleTabSelection = (id: string) => {
    setSelectedTab(id);
  };

  const selectedTabContent = tabsContent.find(
    (_, index) => tabTitles[index].id === selectedTab
  );

  return (
    <Box
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        mt: 3,
      }}
    >
      <TabsSidebar
        tabTitles={tabTitles}
        selectedTab={selectedTab}
        onTabSelection={handleTabSelection}
      />
      <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}` }} />
      <TabsMain selectedTabContent={selectedTabContent ?? null} />
    </Box>
  );
};
