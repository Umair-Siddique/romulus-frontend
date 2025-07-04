import React from "react";
import { Drawer, Box } from "@mui/material";
import { NavigationList } from "./NavigationList";
import { LogoutButton } from "./LogoutButton";
import { TrainingProgressCard } from "./TrainingProgressCard";
import { getNavigationItems } from "./navigationData";
import { Header } from "./header";
import { useUserContext } from "../../context";

export const Sider = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigationItems = getNavigationItems(role);

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: 245,
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
        {role === "educator" && <TrainingProgressCard />}
      </Box>
    </Drawer>
  );
};
