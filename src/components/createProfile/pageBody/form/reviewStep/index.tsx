import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

export interface FormData {
  [key: string]: any;
}

interface ReviewStepProps {
  formData: FormData;
  role: string | null;
  onSubmit: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  role,
  onSubmit,
}) => {
  const renderValue = (key: string, value: any) => {
    if (!value) return "Not provided";
    if (value instanceof File) return value.name;
    return value.toString();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Review & Submit
      </Typography>

      <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Please review your information:
        </Typography>

        {Object.entries(formData).map(([key, value]) => (
          <Box key={key} sx={{ mb: 1, display: "flex" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                minWidth: 150,
                textTransform: "capitalize",
              }}
            >
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </Typography>
            <Typography sx={{ ml: 2 }}>{renderValue(key, value)}</Typography>
          </Box>
        ))}
      </Paper>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onSubmit}
        sx={{ mt: 2 }}
      >
        Submit Application
      </Button>
    </Box>
  );
};
