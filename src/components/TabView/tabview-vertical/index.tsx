import { useCallback, useState } from "react";
import { Box } from "@mui/material";
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
    component: React.ReactNode;
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

  const tabContents = tabs.map(({ component }) => component);

  const selectedTabContent = tabContents.find(
    (_, index) => tabTitles[index].id === selectedTabId
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
