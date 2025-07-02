import React from "react";
import { Drawer, Box } from "@mui/material";
import { NavigationList } from "./NavigationList";
import { LogoutButton } from "./LogoutButton";
import { TrainingProgressCard } from "./TrainingProgressCard";
import { getNavigationItems } from "./navigationData";
import { Header } from "./header";

export const Sider = () => {
  const navigationItems = getNavigationItems("educator");

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        },
      }}
    >
      <Header />
      <NavigationList items={navigationItems} />

      <Box sx={{ mt: "auto", p: 2 }}>
        <LogoutButton />
        <TrainingProgressCard progress={50} />
      </Box>
    </Drawer>
  );
};
