import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const MissionDescriptionCard = memo(({ description }: { description: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        p: theme.spacing(2),
        mb: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          mb: theme.spacing(2),
          color: theme.palette.text.primary,
        }}
      >
        Mission Description
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
});

MissionDescriptionCard.displayName = "MissionDescriptionCard";
