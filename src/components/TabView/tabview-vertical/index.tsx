import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { TabBar } from "./tab-bar";
import { Main } from "./Main";

export const TabViewVertical = ({
  tabsTitles,
  tabsContent,
}: {
  tabsTitles: any[];
  tabsContent: React.ReactNode[];
}) => {
  const theme = useTheme<Theme>();

  const [selectedTab, setSelectedTab] = useState(tabsTitles[0].id);

  const handleTabChange = useCallback(
    (id: string) => {
      setSelectedTab(id);
    },
    [] // no dependencies except setSelectedTab, which is stable
  );

  const selectedTabContent = tabsContent.find(
    (_, index) => tabsTitles[index].id === selectedTab
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
      {/* Tab Navigation */}
      <TabBar
        tabsTitles={tabsTitles}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />

      {/* Divider */}
      <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}` }} />

      {/* Tab Content */}
      <Main selectedTabContent={selectedTabContent ?? null} />
    </Box>
  );
};
