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
  const [formData, setFormData] = useState<FormData>({});

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
    console.log("Form submitted:", { ...formData, role });
    alert("Application submitted successfully!");
  };

  // Validation function to check if current step is complete
  const validateCurrentStep = () => {
    const currentStepName = steps[activeStep];
    const stepConfig = getStepConfig();
    const currentStepFields = stepConfig[currentStepName] || [];

    // Check if all required fields are filled
    for (const field of currentStepFields) {
      if (field.required) {
        const value = formData[field.name];

        // Check if value exists and is not empty
        if (
          !value ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  // Get missing required fields for current step
  const getMissingRequiredFields = () => {
    const currentStepName = steps[activeStep];
    const stepConfig = getStepConfig();
    const currentStepFields = stepConfig[currentStepName] || [];
    const missingFields: string[] = [];

    for (const field of currentStepFields) {
      if (field.required) {
        const value = formData[field.name];

        if (
          !value ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          missingFields.push(field.label);
        }
      }
    }
    return missingFields;
  };

  const getCurrentStepComponent = () => {
    const currentStepName = steps[activeStep];
    const stepConfig = getStepConfig();

    // Check if this is the review step
    if (currentStepName === "Review & Submit") {
      return (
        <ReviewStep
          formData={formData}
          onFieldChange={handleFieldChange}
          stepConfig={stepConfig}
        />
      );
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
          handleSubmit();
        } else if (activeStep < steps.length - 1) {
          // Validate current step before moving to next
          if (validateCurrentStep()) {
            setActiveStep((prev) => prev + 1);
          } else {
            const missingFields = getMissingRequiredFields();
            alert(
              `Please fill in all required fields before proceeding:\n\n• ${missingFields.join(
                "\n• "
              )}`
            );
          }
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

  // Check if next button should be disabled
  const isNextButtonDisabled = () => {
    const currentStepName = steps[activeStep];

    // For review step, always allow submit
    if (currentStepName === "Review & Submit") {
      return false;
    }

    // For other steps, check validation
    return !validateCurrentStep();
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
      isDisabled: isNextButtonDisabled(),
      bgColor: isNextButtonDisabled() ? "#E0E0E0" : "#A1B7AF",
      textColor: isNextButtonDisabled() ? "#666" : "white",
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
      {getCurrentStepComponent()}

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
