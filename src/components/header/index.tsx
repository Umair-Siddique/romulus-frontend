import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { type RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme, Theme } from "@mui/material/styles";
import { IUser } from "../../interface";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useLocation } from "react-router";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const theme = useTheme<Theme>();
  const { data: user } = useGetIdentity<IUser>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  console.log("Header -> user:", user);
  console.log("Header -> user:", user);

  console.log("Header -> location.pathname:", location.pathname);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{
        "& .MuiToolbar-root": {
          minHeight: theme.spacing(8),
        },
        height: theme.spacing(8),
        borderBottom: `1px solid ${theme.palette.divider}`,
        // add some drop shadow
        boxShadow: `0px 2px 8px rgba(126, 148, 142, 0.08)`,
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: {
            xs: theme.spacing(2),
            sm: theme.spacing(3),
          },
          paddingRight: {
            xs: theme.spacing(2),
            sm: theme.spacing(3),
          },
        }}
      >
        <Box
          minWidth={theme.spacing(5)} // 40px equivalent using theme spacing
          minHeight={theme.spacing(5)} // 40px equivalent using theme spacing
          marginRight={{
            xs: theme.spacing(0),
            sm: theme.spacing(2), // 16px equivalent
          }}
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: theme.palette.text.primary,
            flexGrow: 1,
          }}
        >
          Missions
        </Box>

        {/* Right side - Notification and User */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notification Icon */}
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            <NotificationsOutlinedIcon />
          </IconButton>

          {/* User Info with Dropdown */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              cursor: "pointer",
              padding: theme.spacing(0.5, 1),
              borderRadius: theme.spacing(1),
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={handleUserMenuClick}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: theme.spacing(4),
                height: theme.spacing(4),
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {user?.name || "John Doe"}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: "1rem",
                color: theme.palette.text.secondary,
              }}
            />
          </Stack>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
