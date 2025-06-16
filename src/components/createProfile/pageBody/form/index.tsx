import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import { NavigationButton } from "../navigationButtons";
import { educatorStepsConfig, organizationStepsConfig } from "./formConfig";
import { ReviewStep } from "./reviewStep";
import { FormStep } from "./formStep";
interface FormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
  role: string | null;
}

export interface FormData {
  [key: string]: any;
}

export const Form = ({ activeStep, setActiveStep, steps, role }: FormProps) => {
  const [formData, setFormData] = useState<FormData>(new FormData());

  // Get field configuration based on role and step
  const getStepConfig = () => {
    const config =
      role === "educator" ? educatorStepsConfig : organizationStepsConfig;
    return config as any;
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
  };

  const getCurrentStepComponent = () => {
    const currentStepName = steps[activeStep];
    const stepConfig = getStepConfig();

    // Check if this is the review step
    if (currentStepName === "Review & Submit") {
      return <ReviewStep formData={formData} role={role} />;
    }

    // Render form step
    const fields = stepConfig[currentStepName] || [];
    return (
      <FormStep
        title={currentStepName}
        fields={fields}
        formData={formData}
        onFieldChange={handleFieldChange}
      />
    );
  };

  const handleNavigation = (navigateTo: string) => {
    switch (navigateTo) {
      case "next":
        if (steps[activeStep] === "Review & Submit") {
          // Submit on review step
          handleSubmit();
        } else if (activeStep < steps.length - 1) {
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
      isDisabled: false,
      bgColor: "#A1B7AF",
      textColor: "white",
      label: steps[activeStep] === "Review & Submit" ? "Submit" : "Next →",
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
      {/* Render current step */}
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
