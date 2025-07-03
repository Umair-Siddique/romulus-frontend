import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useCreate } from "@refinedev/core";

import { ReviewStep } from "./reviewStep";
import { FormStep } from "./formStep";
import { Modal } from "../../../modal";
import { NavigationButton } from "../navigationButtons";
import { educatorStepsConfig, organizationStepsConfig } from "./formConfig";

interface FormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
  role: string | null;
  user?: any;
}

export interface FormData {
  [key: string]: any;
}

export const Form = ({
  activeStep,
  setActiveStep,
  steps,
  role,
  user,
}: FormProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [config, setConfig] = useState<Record<string, any[]>>({});

  const { mutate } = useCreate({
    resource: role === "educator" ? "educators" : "organizations",
    mutationOptions: {
      onSuccess: (data) => {
        console.log("Submission successful:", data);
        setShowSuccessModal(true);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error("Submission failed:", error.message);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        setShowErrorModal(true);
        setIsSubmitting(false);
      },
    },
  });

  const navigate = useNavigate();
  const theme = useTheme<Theme>();

  useEffect(() => {
    if (role === "educator") {
      setConfig(educatorStepsConfig);
    } else if (role === "organization") {
      setConfig(organizationStepsConfig);
    }
  }, [role]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Compress image function
  const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.7
  ): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        // Set canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const submitData = new FormData();

    if (user?.userId) {
      submitData.append("user", user.userId);
    }

    // Process each field in formData
    for (const [key, value] of Object.entries(formData)) {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          if (value.type.startsWith("image/")) {
            const compressedFile = await compressImage(value, 800, 0.7);
            submitData.append(key, compressedFile);
          } else {
            // Add non-image files directly
            submitData.append(key, value);
          }
        } else if (key === "branches" && Array.isArray(value)) {
          // Handle branches array specially
          value.forEach((branch, index) => {
            // Add each branch field individually
            Object.entries(branch).forEach(([branchKey, branchValue]) => {
              if (branchValue instanceof File) {
                // Handle files in branches (like residence guidelines)
                submitData.append(
                  `branches[${index}][${branchKey}]`,
                  branchValue
                );
              } else if (branchValue !== null && branchValue !== undefined) {
                // Handle regular branch fields
                submitData.append(
                  `branches[${index}][${branchKey}]`,
                  branchValue.toString()
                );
              }
            });
          });
        } else if (Array.isArray(value)) {
          // Handle other arrays (like skills) - send as JSON string
          if (value.length > 0) {
            submitData.append(key, JSON.stringify(value));
          }
        } else {
          // Handle regular form fields
          submitData.append(key, value.toString());
        }
      }
    }

    mutate({
      values: submitData,
      meta: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSuccessModalSubmit = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleErrorModalSubmit = () => {
    // Allow user to try again
    setShowErrorModal(false);
    setErrorMessage("");
  };

  // Validation function to check if current step is complete
  const validateCurrentStep = () => {
    const currentStepName = steps[activeStep];
    const currentStepFields = config[currentStepName] || [];

    for (const field of currentStepFields) {
      if (field.required) {
        const value = formData[field.name];

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
    const currentStepFields = config[currentStepName] || [];
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

    // In Form component, update the ReviewStep call:
    if (currentStepName === "Review & Submit") {
      return (
        <ReviewStep
          formData={formData}
          onFieldChange={handleFieldChange}
          stepConfig={config}
          role={role} // Add this line
        />
      );
    }
    const fields = config[currentStepName] || [];
    return (
      <FormStep
        title={currentStepName}
        fields={fields}
        formData={formData}
        onFieldChange={handleFieldChange}
        role={role} // Add this line
      />
    );
  };

  const handleNavigation = (navigateTo: string) => {
    switch (navigateTo) {
      case "next":
        if (steps[activeStep] === "Review & Submit") {
          handleSubmit();
        } else if (activeStep < steps.length - 1) {
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

  const isNavigationDisabled = (navigateTo: "back" | "next") => {
    switch (navigateTo) {
      case "back":
        return activeStep === 0 || isSubmitting;
      case "next":
        return !validateCurrentStep() || isSubmitting;
      default:
        return false;
    }
  };

  // Use MUI's theme to resolve colors before passing to NavigationButton
  const navigationButtonsConfig: {
    navigateTo: "back" | "next";
    isDisabled: boolean;
    bgColor: string;
    textColor: string;
    label: string;
  }[] = [
    {
      navigateTo: "back",
      isDisabled: isNavigationDisabled("back"),
      bgColor: isNavigationDisabled("back")
        ? theme.palette.action.disabled
        : theme.palette.primary.main,
      textColor: isNavigationDisabled("back")
        ? theme.palette.text.disabled
        : theme.palette.primary.contrastText,
      label: "← Back",
    },
    {
      navigateTo: "next",
      isDisabled: isNavigationDisabled("next"),
      bgColor: isNavigationDisabled("next")
        ? theme.palette.action.disabled
        : theme.palette.primary.main,
      textColor: isNavigationDisabled("next")
        ? theme.palette.text.disabled
        : theme.palette.primary.contrastText,
      label:
        steps[activeStep] === "Review & Submit"
          ? isSubmitting
            ? "Submitting..."
            : "Submit"
          : "Next →",
    },
  ];

  return (
    <>
      <Paper
        sx={{
          borderRadius: theme.spacing(0.25), // 2px equivalent using theme spacing
          backgroundColor: theme.palette.background.default, // Using theme background paper
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          p: theme.spacing(4),
          minHeight: theme.spacing(62.5), // 500px equivalent using theme spacing (500/8 = 62.5)
        }}
      >
        {getCurrentStepComponent()}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: theme.spacing(4),
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

      {/* Success Modal */}
      <Modal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        onSubmit={handleSuccessModalSubmit}
        icon={<CheckCircle />}
        title="Submitted successfully!"
        description={`Your profile has been received and is now under review. After submission, your profile will be reviewed within 24-48 hours. You will be informed by email.`}
        showButton={true}
        buttonText="Continue to Dashboard"
      />

      {/* Error Modal */}
      <Modal
        open={showErrorModal}
        onClose={handleErrorModalClose}
        onSubmit={handleErrorModalSubmit}
        icon={<Cancel sx={{ color: theme.palette.error.main }} />}
        title="Submission Failed"
        description={errorMessage}
        showButton={true}
        buttonText="Try Again"
      />
    </>
  );
};
