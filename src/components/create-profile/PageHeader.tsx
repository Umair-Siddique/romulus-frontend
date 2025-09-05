import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLogout } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import {
  AccountCircle as AccountCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

import logoImage from "/images/logo.png"; // Adjust the path as necessary
import { useNavigate } from "react-router";
import { useUserContext } from "#context";

export const PageHeader = () => {
  const theme = useTheme<Theme>();
  const userContext = useUserContext();
  const user = userContext?.user;
  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/");
    }
  }, [role]);

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
        bgcolor: theme.palette.background.default, // Using theme background paper instead of hardcoded "white"
        borderBottom: `1px solid ${theme.palette.divider}`, // Using theme divider color instead of hardcoded #e0e0e0
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: theme.spacing(1) }}>
        <Box sx={{ textAlign: "center" }}>
          <Box component="img" src={logoImage} width={50} />
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
            <AccountCircleIcon sx={{ mr: theme.spacing(0.5) }} />
            <ArrowDropDownIcon />
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

PageHeader.displayName = "PageHeader";
