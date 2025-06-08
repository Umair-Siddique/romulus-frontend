import { Box, Typography } from "@mui/material";
import React from "react";

type FormHeaderProps = {
  title: string;
  description: string;
};

const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => {
  return (
    <Box sx={{ width: 450}}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          mb: 1,
          color: "#1a1a1a",
          fontSize: { xs: "28px", md: "32px" },
          fontFamily: "montserrat, sans-serif",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          textAlign: "center",
          mb: 1,
          fontSize: "15px",
          lineHeight: 1.5,
          fontFamily: "montserrat, sans-serif",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FormHeader;
