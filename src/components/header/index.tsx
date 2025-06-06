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

interface IUser {
  name: string;
  avatar: string;
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{
        "& .MuiToolbar-root": {
          minHeight: "64px",
        },
        height: "64px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: {
            xs: "0",
            sm: "16px",
            md: "24px",
          },
        }}
      >
        <Box
          minWidth="40px"
          minHeight="40px"
          marginRight={{
            xs: "0",
            sm: "16px",
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
          <Stack
            direction="row"
            gap={{
              xs: "8px",
              sm: "16px",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              fontSize={{
                xs: "12px",
                sm: "14px",
              }}
              variant="subtitle2"
            >
              {user?.name}
            </Typography>
            <Avatar src={user?.avatar} alt={user?.name} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
