import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { NavigationButton } from "../navigationButtons";
import { educatorStepsConfig, organizationStepsConfig } from "./formConfig";

import { useNavigate } from "react-router";
import { ReviewStep } from "./reviewStep";
import { FormStep } from "./formStep";
import { api } from "../../../../utils";
import { Modal } from "../../../modal";

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
  const [formData, setFormData] = useState<FormData>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [config, setConfig] = useState<Record<string, any[]>>({});

  const navigate = useNavigate();

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
    try {
      // Create FormData object for efficient file uploads
      const submitData = new FormData();

      // Add user ID if available
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

      if (role === "educator") {
        const res = await api.post(`/educators`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          setShowSuccessModal(true);
        }
      } else {
        const res = await api.post(`/organizations`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          setShowSuccessModal(true);
        }
      }

      localStorage.setItem("has-profile", "true");
      // Show success modal instead of alert
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Submission error:", error);

      // Extract error message from API response
      let apiErrorMessage = "An unexpected error occurred. Please try again.";

      if (error.response?.data?.message) {
        apiErrorMessage = error.response.data.message;
      } else if (error.response?.status === 413) {
        apiErrorMessage =
          "Files are too large. Please try uploading smaller images or documents.";
      } else if (error.response?.status === 400) {
        apiErrorMessage =
          "Invalid data provided. Please check your inputs and try again.";
      } else if (error.response?.status === 500) {
        apiErrorMessage = "Server error occurred. Please try again later.";
      } else if (error.message) {
        apiErrorMessage = error.message;
      }

      // Set error message and show error modal
      setErrorMessage(apiErrorMessage);
      setShowErrorModal(true);
    }
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

  const isNextButtonDisabled = () => {
    const currentStepName = steps[activeStep];

    if (currentStepName === "Review & Submit") {
      return false;
    }

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
    <>
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
        icon={<Cancel sx={{ color: "#f44336" }} />}
        title="Submission Failed"
        description={errorMessage}
        showButton={true}
        buttonText="Try Again"
      />
    </>
  );
};
