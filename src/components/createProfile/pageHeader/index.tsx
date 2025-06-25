import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";
import { useLogout } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";

import Logo from "../../../assets/images/logo.png";

export const PageHeader: React.FC = () => {
  const theme = useTheme<Theme>();
  const { mutate: logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper, // Using theme background paper instead of hardcoded "white"
        borderBottom: `1px solid ${theme.palette.divider}`, // Using theme divider color instead of hardcoded #e0e0e0
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: theme.spacing(1) }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            width={theme.spacing(5)} // 40px equivalent using theme spacing (40/8 = 5)
            height={theme.spacing(5)} // 40px equivalent using theme spacing (40/8 = 5)
          />
        </Box>

        {/* Profile Dropdown */}
        <Box>
          <IconButton
            onClick={handleProfileClick}
            sx={{
              display: "flex",
              alignItems: "center",
              color: theme.palette.text.secondary, // Using theme text secondary instead of hardcoded #666
            }}
          >
            <AccountCircle sx={{ mr: theme.spacing(0.5) }} />
            <ArrowDropDown />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
