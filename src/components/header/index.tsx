import React, { useEffect, useState } from "react";
import { useLogout, useOne } from "@refinedev/core";
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
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useLocation } from "react-router";
import { useUserContext } from "../../context";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const theme = useTheme<Theme>();
  const [pageName, setPageName] = useState<string>("");

  const { user } = useUserContext();
  const { educatorId, organizationId, role } = user;

  const { data } = useOne({
    resource: role === "educator" ? "educators" : "organizations",
    id: educatorId || organizationId,
    queryOptions: {
      enabled: !!(educatorId || organizationId),
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const { mutate: logout } = useLogout();

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setPageName(path ? path.charAt(0).toUpperCase() + path.slice(1) : "");
  }, [location.pathname]);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = (action: "logout") => {
    setAnchorEl(null);
    if (action === "logout") {
      logout();
    }
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
        height: theme.spacing(10),
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: `inset 0 2px 8px rgba(126, 148, 142, 0.08), inset 0 -2px 8px rgba(126, 148, 142, 0.08), inset 2px 0 8px rgba(126, 148, 142, 0.08), inset -2px 0 8px rgba(126, 148, 142, 0.08)`,
        borderRadius: theme.shape.borderRadius,
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
          height: "100%",
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
          {pageName === "Admin" ? "Dashboard" : pageName}
        </Box>

        {/* Right side - Notification and User */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notification Icon */}
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.spacing(1),
            }}
          >
            <NotificationsOutlinedIcon sx={{ fontSize: "25px" }} />
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
              src={data?.data.avatar}
              alt="avatar"
              sx={{
                width: theme.spacing(5),
                height: theme.spacing(5),
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 500,
              }}
            >
              {data?.data.organizationName ||
                (data?.data.firstName &&
                  data?.data.firstName + " " + data?.data.lastName) ||
                "Admin"}
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
            <MenuItem onClick={() => handleUserMenuClose("logout")}>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
