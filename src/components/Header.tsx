import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLogout, useOne } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { SetStateAction, useEffect, useState } from "react";
import {
  ArrowBack as ArrowBackIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
} from "@mui/icons-material";

import { useUserContext } from "#context";

export const Header = () => {
  const theme = useTheme<Theme>();
  const [pageName, setPageName] = useState<string>("");
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const { user, setUserProfile, setRefetchUserProfile } = useUserContext();
  const navigate = useNavigate();

  const { educatorId, organizationId, role } = user;

  const { data: userProfile, refetch: refetchUserProfile } = useOne({
    resource: role === "educator" ? "educators" : "organizations",
    id: educatorId || organizationId,
    queryOptions: {
      enabled: !!(educatorId || organizationId),
    },
  });

  useEffect(() => {
    if (userProfile) {
      setUserProfile(userProfile.data);
      if (refetchUserProfile && setRefetchUserProfile) {
        setRefetchUserProfile(() => refetchUserProfile);
      }
    }
  }, [userProfile, setUserProfile]);

  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { mutate: logout } = useLogout();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "";
    const secondLastSegment = segments[segments.length - 2] || "";

    const isObjectIdPattern = /^[a-f0-9]{24}$/i.test(lastSegment);
    setShowBackButton(isObjectIdPattern);

    if (isObjectIdPattern) {
      const detailNameMap: Record<string, string> = {
        missions: "Mission Details",
        educators: "Educator Details",
        organizations: "Organization Details",
        reports: "Report Details",
      };

      const customName = detailNameMap[secondLastSegment];
      setPageName(customName || "Details");
    } else {
      const fallbackName =
        lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
      setPageName(fallbackName || "Dashboard");
    }
  }, [location.pathname]);

  const handleUserMenuClick = (event: {
    currentTarget: SetStateAction<HTMLElement | null>;
  }) => {
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
        width: "97%",
        marginLeft: "18px",
        marginTop: theme.spacing(2),
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
          width: "100%",
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
            fontWeight: theme.typography.h2.fontWeight,
            fontSize: "1.25rem",
            color: theme.palette.text.primary,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* Display back button with icon */}
          {showBackButton && (
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1),
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

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
              src={userProfile?.data.avatar}
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
                fontWeight: theme.typography.h3.fontWeight,
              }}
            >
              {userProfile?.data.organizationName ||
                (userProfile?.data.firstName &&
                  userProfile?.data.firstName +
                    " " +
                    userProfile?.data.lastName) ||
                ""}
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
