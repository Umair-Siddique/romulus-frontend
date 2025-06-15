import React from "react";
import { Box, Typography } from "@mui/material";

interface FormHeaderProps {
  userRole: string | null;
}

export const FormHeader = ({ userRole }: FormHeaderProps) => {
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Hi {userRole}, let's complete
      </Typography>
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{ fontFamily: "Montserrat, sans-serif" }}
      >
        your profile
      </Typography>
    </Box>
  );
};
