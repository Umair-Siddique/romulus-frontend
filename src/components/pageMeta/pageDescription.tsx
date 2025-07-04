import { useTheme, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import React from "react";

interface PageDescriptionProps {
  description: string;
}

export const PageDescription: React.FC<PageDescriptionProps> = ({
  description,
}) => {
  const theme = useTheme<Theme>();

  return (
    <Typography
      variant="body1"
      sx={{
        color: theme.palette.text.secondary,
        mb: theme.spacing(1),
        fontSize: "0.9375rem",
        lineHeight: theme.typography.body1.lineHeight,
        fontFamily: theme.typography.body1.fontFamily,
      }}
    >
      {description}
    </Typography>
  );
};
