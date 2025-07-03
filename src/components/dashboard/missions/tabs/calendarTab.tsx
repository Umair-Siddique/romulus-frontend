import { Typography } from "@mui/material";
import React from "react";
import { useTheme, Theme } from "@mui/material/styles";

export const CalendarTab: React.FC = () => {
  const theme = useTheme<Theme>();

  return (
    <>
      <Typography variant="h6">Calendar View</Typography>
      <Typography variant="body2" color="text.secondary">
        Calendar component will be loaded here
      </Typography>
    </>
  );
};
