import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

interface HeroHeaderProps {
  userRole: string | null;
}

export const HeroHeader = ({ userRole }: HeroHeaderProps) => {
  const theme = useTheme<Theme>();
  const user = userRole
    ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
    : "";

  return (
    <Box sx={{ textAlign: "center", mb: theme.spacing(6) }}>
      <Typography
        variant="h3"
        fontWeight={theme.typography.h3.fontWeight} // Using theme's h3 fontWeight (600)
        sx={{ fontFamily: theme.typography.h3.fontFamily }} // Using theme's h3 fontFamily
      >
        Welcome {user}!
      </Typography>
      <Typography
        variant="h3"
        fontWeight={theme.typography.h3.fontWeight} // Using theme's h3 fontWeight (600)
        sx={{ fontFamily: theme.typography.h3.fontFamily }} // Using theme's h3 fontFamily
      >
        Let's complete your profile
      </Typography>
    </Box>
  );
};
