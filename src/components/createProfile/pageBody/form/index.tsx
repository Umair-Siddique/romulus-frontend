import React from "react";
import { Box, Paper } from "@mui/material";
import { NavigationButton } from "../navigationButtons";

// Import your step components (adjust paths as needed)
import { ProfileSetup } from "../steps/profileSetup";
import { Identity } from "../steps/identity";
import { Profession } from "../steps/profession";
import { ReviewSubmit } from "../steps/reviewSubmit";

interface FormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
}

export const Form = ({ activeStep, setActiveStep, steps }: FormProps) => {
  // Steps configuration array
  const stepsConfig = [
    {
      name: "Profile Setup",
      component: <ProfileSetup />,
    },
    {
      name: "Identity",
      component: <Identity />,
    },
    {
      name: "Profession",
      component: <Profession />,
    },
    {
      name: "Review & Submit",
      component: <ReviewSubmit />,
    },
  ];

  // Get current step component based on step name
  const getCurrentStepComponent = () => {
    const currentStepName = steps[activeStep];
    const stepConfig = stepsConfig.find(
      (config) => config.name === currentStepName
    );
    return stepConfig?.component || null;
  };

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
      {/* Render only the current active step */}
      {getCurrentStepComponent()}

      {/* Navigation Buttons */}
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
