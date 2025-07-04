import { useTheme, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import React from "react";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const theme = useTheme<Theme>();

  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: theme.typography.h3.fontWeight,
        mb: theme.spacing(1),
        color: theme.palette.text.primary,
        fontSize: { xs: "1.75rem", md: "2rem" },
        fontFamily: theme.typography.h4.fontFamily,
      }}
    >
      {title}
    </Typography>
  );
};
