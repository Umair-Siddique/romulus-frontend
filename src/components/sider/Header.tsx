import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

import logoImage from "/images/logo.png";
import { LogoComponent } from "../LogoComponent";

export const Header = () => {
  const theme = useTheme<Theme>();

  return (
    <Box p={3}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <LogoComponent logoImage={logoImage} width={35} />
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
