import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router";

import { NavigationListProps } from "#types";

export const NavigationList = ({ items, onItemClick }: NavigationListProps) => {
  const theme = useTheme();

  return (
    <List sx={{ px: 2 }}>
      {items.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <Link to={item.to} key={item.text} style={{ textDecoration: "none" }}>
            <ListItemButton
              onClick={() => onItemClick(index)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: item.active
                  ? theme.palette.background.default
                  : "transparent",
                "&:hover": {
                  backgroundColor: item.active
                    ? theme.palette.action.hover
                    : theme.palette.action.selected,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  minWidth: 40,
                }}
              >
                <IconComponent />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    color: item.active
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                    fontWeight: item.active ? 600 : 400,
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </Link>
        );
      })}
    </List>
  );
};
