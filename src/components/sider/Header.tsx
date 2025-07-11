import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

import logoImage from "/images/logo.png";
import { LogoComponent } from "../LogoComponent";

export const Header = () => {
  const theme = useTheme<Theme>();

  return (
    <Box p={3}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <LogoComponent logoImage={logoImage} width={40} />
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.typography.h2.fontWeight,
            fontSize: "2rem",
          }}
        >
          Romulus
        </Typography>
      </Stack>
    </Box>
  );
};
