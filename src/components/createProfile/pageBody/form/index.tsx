import React from "react";
import { Box, Paper } from "@mui/material";
import { EducatorSteps } from "../educatorSteps";
import { NavigationButton } from "../navigationButtons";

interface FormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
}

export const Form = ({ activeStep, setActiveStep, steps }: FormProps) => {
  const handleNavigation = (navigateTo: string) => {
    switch (navigateTo) {
      case "next":
        if (activeStep < steps.length - 1) {
          setActiveStep((prev) => prev + 1);
        }
        break;
      case "back":
        if (activeStep > 0) {
          setActiveStep((prev) => prev - 1);
        }
        break;
      default:
        break;
    }
  };

  const navigationButtonsConfig: {
    navigateTo: "back" | "next";
    isDisabled: boolean;
    bgColor: string;
    textColor: string;
    label: string;
  }[] = [
    {
      navigateTo: "back",
      isDisabled: activeStep === 0,
      bgColor: "#FFF",
      textColor: "black",
      label: "← Back",
    },
    {
      navigateTo: "next",
      isDisabled: activeStep === steps.length - 1,
      bgColor: "#A1B7AF",
      textColor: "white",
      label: "Next →",
    },
  ];

  return (
    <Paper
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        p: 4,
        minHeight: 500,
      }}
    >
      <EducatorSteps activeStep={activeStep} />

      {/* Navigation Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        {navigationButtonsConfig.map((buttonConfig) => (
          <NavigationButton
            key={buttonConfig.navigateTo}
            handleNavigation={handleNavigation}
            navigateTo={buttonConfig.navigateTo}
            isDisabled={buttonConfig.isDisabled}
            bgColor={buttonConfig.bgColor}
            textColor={buttonConfig.textColor}
            label={buttonConfig.label}
          />
        ))}
      </Box>
    </Paper>
  );
};
