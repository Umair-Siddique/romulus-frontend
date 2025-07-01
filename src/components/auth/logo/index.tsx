import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LogoProps {
  LogoImage: string;
  width: number | string;
}

export const Logo = ({ LogoImage, width }: LogoProps) => {
  const theme = useTheme();

  return (
      <Box component="img" src={LogoImage} alt="Logo" width={width} />
  );
};
