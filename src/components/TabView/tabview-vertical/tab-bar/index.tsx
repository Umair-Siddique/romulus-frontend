import React from "react";

import { Box } from "@mui/material";

import { TabList } from "./TabList";

export const TabBar = React.memo(
  ({
    tabsTitles,
    selectedTab,
    onTabChange,
  }: {
    tabsTitles: any[];
    selectedTab: string;
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
          tabsTitles={tabsTitles}
          onTabChange={onTabChange}
          selectedTab={selectedTab}
        />
      </Box>
    );
  }
);
