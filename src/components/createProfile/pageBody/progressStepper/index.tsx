import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

interface ProgressStepperProps {
  activeStep: number;
  steps: string[];
}

export const ProgressStepper = ({
  activeStep,
  steps,
}: ProgressStepperProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box sx={{ mb: theme.spacing(4) }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-root .Mui-completed": {
            color: theme.palette.primary.main, // Using theme primary main instead of hardcoded #A1B7AF
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: theme.palette.primary.main, // Using theme primary main instead of hardcoded #A1B7AF
          },
          "& .MuiStepConnector-line": {
            borderColor: theme.palette.primary.light,
          },
          "& .Mui-completed .MuiStepConnector-line": {
            borderColor: theme.palette.primary.light,
          },
          "& .Mui-active .MuiStepConnector-line": {
            borderColor: theme.palette.primary.light,
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
