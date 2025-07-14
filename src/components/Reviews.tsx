import { Box, Rating, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const Reviews = memo(({ title }: { title: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        p: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.h2.fontWeight,
          mb: theme.spacing(2),
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      <Rating value={4} sx={{ mb: theme.spacing(1) }} readOnly />
      <Typography
        variant="body1"
        sx={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        "Great experience. Students were attentive, and the coordinator was
        helpful."
      </Typography>
    </Box>
  );
});

Reviews.displayName = "Reviews";
