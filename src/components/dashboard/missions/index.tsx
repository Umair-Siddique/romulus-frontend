import { Typography } from "@mui/material";
import React from "react";
import { useTheme, Theme } from "@mui/material/styles";

interface AdminDashboardProps {
  role: string;
  title: string;
  description: string;
}

export const MissionsDashboard: React.FC<AdminDashboardProps> = ({
  title,
  description,
}) => {
  const theme = useTheme<Theme>();

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: theme.typography.h3.fontWeight,
          mb: theme.spacing(1),
          color: theme.palette.text.primary,
          fontSize: { xs: "1.75rem", md: "2rem" }, // 28px and 32px equivalents using rem
          fontFamily: theme.typography.h4.fontFamily,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: theme.spacing(1),
          fontSize: "0.9375rem", // 15px equivalent using rem (15/16 = 0.9375)
          lineHeight: theme.typography.body1.lineHeight,
          fontFamily: theme.typography.body1.fontFamily,
        }}
      >
        {description}
      </Typography>
    </>
  );
};
