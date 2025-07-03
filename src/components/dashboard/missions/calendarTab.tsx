import { Box, Typography } from "@mui/material";
import React from "react";

export const CalendarTab: React.FC = () => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <Typography variant="h6">Calendar View</Typography>
    <Typography variant="body2" color="text.secondary">
      Calendar component will be loaded here
    </Typography>
  </Box>
);
