import React from "react";
import { Box, Typography } from "@mui/material";
import { AuthBackgroundProps } from "../../../interface";

export const AuthBackground = React.memo(
  ({ backgroundImage }: AuthBackgroundProps) => {
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
          borderRadius: "30px 0 0 30px",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
            borderRadius: "30px 0 0 30px",
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
            p: 6,
            pb: 8,
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
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              boxShadow: `
                0 0 30px rgba(255, 255, 255, 0.3),
                0 0 60px rgba(255, 255, 255, 0.2),
                0 0 100px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mb: 3,
              lineHeight: 1.2,
              fontSize: { md: "42px", lg: "48px" },
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              fontFamily: "montserrat, sans-serif",
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
              fontWeight: 400,
              maxWidth: "85%",
              margin: "0 auto",
              fontSize: "18px",
              lineHeight: 1.6,
              textShadow: "0 1px 5px rgba(0,0,0,0.3)",
              fontFamily: "montserrat, sans-serif",
            }}
          >
            Find your next task, collaborate with others, and make an impact.
            Join the community today.
          </Typography>
        </Box>
      </Box>
    );
  }
);

AuthBackground.displayName = "AuthBackground";
