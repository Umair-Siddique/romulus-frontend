import { Typography } from "@mui/material";
import React from "react";
import { useTheme, Theme } from "@mui/material/styles";

export const MissionsTab: React.FC = () => {
  const theme = useTheme<Theme>();

  return (
    <>
      <Typography variant="h6">Missions View</Typography>
      <Typography variant="body2" color="text.secondary">
        Missions component will be loaded here
      </Typography>
    </>
  );
};
