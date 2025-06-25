import React from "react";
import { useGetIdentity } from "@refinedev/core";
import {
  type RefineThemedLayoutV2HeaderProps,
  HamburgerMenu,
} from "@refinedev/mui";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme, Theme } from "@mui/material/styles";
import { IUser } from "../../interface";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const theme = useTheme<Theme>();
  const { data: user } = useGetIdentity<IUser>();

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{
        "& .MuiToolbar-root": {
          minHeight: theme.spacing(8), // 64px equivalent using theme spacing
        },
        height: theme.spacing(8), // 64px equivalent using theme spacing
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: {
            xs: theme.spacing(0),
            sm: theme.spacing(2), // 16px equivalent
            md: theme.spacing(3), // 24px equivalent
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
            "& .MuiButtonBase-root": {
              marginLeft: 0,
              marginRight: 0,
            },
          }}
        >
          <HamburgerMenu />
        </Box>

        <Stack
          direction="row"
          width="100%"
          justifyContent="end"
          alignItems="center"
        >
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              mr: theme.spacing(2), // Add consistent spacing before user info
            }}
          >
            <NotificationsOutlinedIcon
              sx={{
                fontSize: theme.spacing(3), // 24px equivalent using theme spacing
                color: theme.palette.primary.main,
              }}
            />
          </Box>
          <Stack
            direction="row"
            gap={{
              xs: theme.spacing(1), // 8px equivalent
              sm: theme.spacing(2), // 16px equivalent
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: theme.spacing(5), // 40px equivalent for consistent sizing
                height: theme.spacing(5), // 40px equivalent for consistent sizing
              }}
            />
            <Typography
              fontSize={{
                xs: "0.75rem", // 12px equivalent using rem
                sm: "0.875rem", // 14px equivalent using rem
              }}
              variant="subtitle2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: theme.typography.subtitle2.fontWeight,
              }}
            >
              {user?.name}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
