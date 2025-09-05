import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

import logoImage from "/images/logo.png";

export const Header = () => {
  const theme = useTheme<Theme>();

  return (
    <Box p={3}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Box component="img" src={logoImage} width={40} />
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
