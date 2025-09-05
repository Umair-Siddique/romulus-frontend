import React from "react";

import { Box } from "@mui/material";

import { TabList } from "./TabList";

export const TabBar = React.memo(
  ({
    tabTitles,
    selectedTabId,
    onTabChange,
  }: {
    tabTitles: any[];
    selectedTabId: string;
    onTabChange: (id: string) => void;
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
          onTabChange={onTabChange}
          selectedTabId={selectedTabId}
        />
      </Box>
    );
  }
);
