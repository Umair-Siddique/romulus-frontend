import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LogoProps {
  logoImage: string;
  width: number | string;
}

export const Logo = ({ logoImage, width }: LogoProps) => {
  const theme = useTheme();

  return (
      <Box component="img" src={logoImage} alt="Logo" width={width} />
  );
};

Logo.displayName = "Logo";