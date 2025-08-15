import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ReportInfo = ({ reportDetails }: { reportDetails: any }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        p: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        width: "75%",
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
        Reason
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        {reportDetails?.reportReason || "N/A"}
      </Typography>
    </Box>
  );
};
