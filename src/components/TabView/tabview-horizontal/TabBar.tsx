import React from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const TabBar = React.memo(
  ({
    tabTitles,
    selectedTabId,
    onTabChange,
  }: {
    tabTitles: { id: string; label: string; icon: any }[];
    selectedTabId: string;
    onTabChange: (id: string) => void;
  }) => {
    const theme = useTheme<Theme>();

    return (
      <Box sx={{ mt: 4, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTabId}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: theme.typography.h3.fontWeight,
              fontSize: "0.875rem",
              minHeight: 48,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
                fontWeight: theme.typography.h2.fontWeight,
              },
            },
          }}
        >
          {tabTitles.map(({ id, label, icon }) => {
            const Icon = icon;
            return (
              <Tab
                key={id}
                label={label}
                icon={<Icon />}
                iconPosition="start"
                onClick={() => onTabChange(id)}
              />
            );
          })}
        </Tabs>
      </Box>
    );
  }
);
