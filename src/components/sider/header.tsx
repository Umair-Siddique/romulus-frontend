import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Logo } from "../auth/logo";
import logoImage from "../../assets/images/logo.png";
import { useTheme, Theme } from "@mui/material/styles";

export const Header = () => {
  const theme = useTheme<Theme>();
  return (
    <Box p={3}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Logo logoImage={logoImage} width={35} />
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: "1.6rem",
          }}
        >
          Romulus
        </Typography>
      </Stack>
    </Box>
  );
};
