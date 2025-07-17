import { Box, Rating, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

import { getElapsedTime } from "#utils";

export const Reviews = memo(({ feedback }: { feedback: any }) => {
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
        {feedback.name} <span>{getElapsedTime(feedback.time)}</span>
      </Typography>
      <Rating value={feedback.rating} sx={{ mb: theme.spacing(1) }} readOnly />
      <Typography
        variant="body1"
        sx={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        "{feedback.comment}"
      </Typography>
    </Box>
  );
});

Reviews.displayName = "Reviews";
