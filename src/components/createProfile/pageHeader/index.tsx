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

import Logo from "../../../assets/images/logo.png";
import { useLogout } from "@refinedev/core";

export const PageHeader: React.FC = () => {
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
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center" }}>
          <Box component="img" src={Logo} alt="Logo" width={40} height={40} />
        </Box>

        {/* Profile Dropdown */}
        <Box>
          <IconButton
            onClick={handleProfileClick}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#666",
            }}
          >
            <AccountCircle sx={{ mr: 0.5 }} />
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
