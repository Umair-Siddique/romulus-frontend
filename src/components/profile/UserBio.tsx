import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const UserBio = memo(({ educatorData }: { educatorData: any }) => {
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
          fontWeight: theme.typography.fontWeightMedium,
          mb: theme.spacing(2),
          color: theme.palette.text.primary,
        }}
      >
        Bio
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        }}
      >
        {educatorData?.bio || "N/A"}
      </Typography>
    </Box>
  );
});

UserBio.displayName = "UserBio";
