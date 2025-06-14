import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

interface ProgressStepperProps {
  activeStep: number;
  steps: string[];
}

export const ProgressStepper = ({
  activeStep,
  steps,
}: ProgressStepperProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#A1B7AF",
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: "#A1B7AF",
          },
          "& .MuiStepConnector-line": {
            borderColor: "#e0e0e0",
          },
          "& .Mui-completed .MuiStepConnector-line": {
            borderColor: "#A1B7AF",
          },
          "& .Mui-active .MuiStepConnector-line": {
            borderColor: "#A1B7AF",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "0.875rem",
                  fontWeight: 500,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
