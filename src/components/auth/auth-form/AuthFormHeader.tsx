import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { AuthFormHeaderProps } from "#types";

const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box sx={{ width: theme.spacing(56.25) }}>
      {" "}
      {/* 450px equivalent using theme spacing (450/8 = 56.25) */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: theme.typography.h4.fontWeight,
          textAlign: "center",
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
          textAlign: "center",
          mb: theme.spacing(1),
          fontSize: "0.9375rem", // 15px equivalent using rem (15/16 = 0.9375)
          lineHeight: theme.typography.body1.lineHeight,
          fontFamily: theme.typography.body1.fontFamily,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default AuthFormHeader;

AuthFormHeader.displayName = "AuthFormHeader";
