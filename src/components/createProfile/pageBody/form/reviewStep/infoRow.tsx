import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

interface InfoRowProps {
  label: string;
  value: any;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  const theme = useTheme<Theme>();

  return (
    <Box sx={{ display: "flex", mb: theme.spacing(1.5) }}>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          minWidth: theme.spacing(15),
          fontSize: "0.875rem",
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.primary,
          ml: theme.spacing(2),
          fontSize: "0.875rem",
        }}
      >
        {value || "Not provided"}
      </Typography>
    </Box>
  );
};
