import React from "react";
import { Box, Typography } from "@mui/material";

interface HeroHeaderProps {
  userRole: string | null;
}

export const HeroHeader = ({ userRole }: HeroHeaderProps) => {
  const user = userRole
    ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
    : "";
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Welcome {user}!
      </Typography>
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Let's complete your profile
      </Typography>
    </Box>
  );
};
