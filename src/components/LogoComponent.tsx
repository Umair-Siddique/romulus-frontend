import { Box } from "@mui/material";

import { LogoComponentProps } from "#types";

export const LogoComponent = ({ logoImage, width }: LogoComponentProps) => {
  return (
    <Box component="img" src={logoImage} alt="LogoComponent" width={width} />
  );
};

LogoComponent.displayName = "LogoComponent";
