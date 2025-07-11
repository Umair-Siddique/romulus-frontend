import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { AuthBackgroundProps } from "#types";

export const AuthBackground = ({ backgroundImage }: AuthBackgroundProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        width: "55%",
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: { xs: "none", md: "flex" },
        alignItems: "flex-end",
        borderRadius: `${theme.spacing(3.75)} 0 0 ${theme.spacing(3.75)}`,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
          borderRadius: `${theme.spacing(3.75)} 0 0 ${theme.spacing(3.75)}`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Overlay Text */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          color: "white",
          p: theme.spacing(6),
          pb: theme.spacing(8),
          textAlign: "center",
          width: "100%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "80%",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: theme.spacing(2.5),
            backdropFilter: "blur(10px)",
            boxShadow: `
                0 0 30px rgba(255, 255, 255, 0.3),
                0 0 60px rgba(255, 255, 255, 0.2),
                0 0 100px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
            "& fieldset": {
              borderColor: theme.palette.divider,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.light,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.light,
              borderWidth: 2,
            },
            zIndex: -1,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: theme.typography.h2.fontWeight,
            mb: theme.spacing(3),
            lineHeight: theme.typography.h2.lineHeight,
            fontSize: {
              md: theme.typography.h1.fontSize,
              lg: "3rem",
            },
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            fontFamily: theme.typography.h2.fontFamily,
            color: "white",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          Connecting Educators to Meaningful Missions
        </Typography>
        <Typography
          variant="h6"
          sx={{
            opacity: 0.95,
            fontWeight: theme.typography.h5.fontWeight,
            maxWidth: "85%",
            margin: "0 auto",
            fontSize: "1.125rem",
            lineHeight: theme.typography.h6.lineHeight,
            color: "white",
            textShadow: "0 1px 5px rgba(0,0,0,0.3)",
            fontFamily: theme.typography.h6.fontFamily,
          }}
        >
          Find your next task, collaborate with others, and make an impact. Join
          the community today.
        </Typography>
      </Box>
    </Box>
  );
};

AuthBackground.displayName = "AuthBackground";
