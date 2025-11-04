import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { InfoRowProps } from "#types";

export const InfoRow = ({ label, value }: InfoRowProps) => {
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
        {value || "Non fourni"}
      </Typography>
    </Box>
  );
};
