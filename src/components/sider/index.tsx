import { useEffect, useState } from "react";
import { Drawer, Box } from "@mui/material";

import { Header } from "./Header";
import { LogoutButton } from "./LogoutButton";
import { useUserContext } from "#context";
import { NavigationList } from "./NavigationList";
import { getNavigationItems } from "./navigationData";
import { TrainingProgressCard } from "./TrainingProgressCard";

export const Sider = () => {
  const { user } = useUserContext();

  const [items, setItems] = useState(() => getNavigationItems(role));

  const { role } = user;

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
        borderRadius: "0 40px 40px 0",
        [`& .MuiDrawer-paper`]: {
          width: 280,
          boxSizing: "border-box",
          border: "none",
          backgroundColor: "#fafafa",
          borderRadius: "0 40px 40px 0",
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
