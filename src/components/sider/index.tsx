import { useEffect, useState } from "react";
import { Drawer, Box, useTheme, Theme } from "@mui/material";

import { Header } from "./Header";
import { LogoutButton } from "./LogoutButton";
import { useUserContext } from "#context";
import { NavigationList } from "./NavigationList";
import { getNavigationItems } from "./navigationData";
import { TrainingProgressCard } from "./TrainingProgressCard";

export const Sider = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const [items, setItems] = useState(() => getNavigationItems(role));

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        active: item.to === window.location.pathname,
      }))
    );
  }, []);

  const handleItemClick = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  return (
    <Drawer
      variant="persistent"
      open={true}
      sx={{
        width: 280,
        flexShrink: 0,
        border: "none",
        borderRadius: theme.shape.borderRadius,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
          border: "none",
          backgroundColor: theme.palette.grey[50],
          borderRadius: theme.shape.borderRadius
        },
      }}
    >
      <Header />
      <NavigationList items={items} onItemClick={handleItemClick} />
      <Box sx={{ mt: "auto", p: 2 }}>
        <LogoutButton />
        {role === "educator" && <TrainingProgressCard />}
      </Box>
    </Drawer>
  );
};
