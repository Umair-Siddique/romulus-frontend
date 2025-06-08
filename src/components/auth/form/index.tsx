import React from "react";
import { Box } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import FormHeader from "../formHeader";
import FormField from "../formField";
import SubmitButton from "../submitButton";
import TextLink from "../../textLink";

interface FormProps {
  formTitle: string;
  formDescription: string;
  formfields: any[];
  formType: string;
  isLoading?: boolean;
  submitLoadingText?: string;
  submitLabel?: string;
  bottomTextWithLink?: React.ReactNode;
  formStep?: number;
  setFormStep?: (step: number) => void;
  handleSubmit?: any;
  onSubmit?: any;
}

export const Form: React.FC<FormProps> = ({
  formTitle,
  formDescription,
  formfields,
  formType,
  isLoading,
  submitLoadingText = "Loading...",
  submitLabel = "Submit",
  bottomTextWithLink = undefined,
  formStep,
  setFormStep = () => {},
  handleSubmit = () => {},
  onSubmit = () => {},
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        display: "flex",
        flexDirection: "column",
        px: { xs: 3, md: 6 },
        py: 4,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo - Fixed to top */}
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Box component={"img"} src={Logo} alt="Logo" />
      </Box>

      {/* Content Container - Centered vertically in remaining space */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Form */}
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          {/* Form Header */}
          <FormHeader title={formTitle} description={formDescription} />

          {/* Form Fields */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate // Prevent browser validation
            sx={{ mt: 2 }}
          >
            {formfields.map((field, index) => (
              <FormField
                key={index}
                label={field.label}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                options={field.options}
                register={field.register}
                errors={field.errors}
                validationRules={field.validationRules}
                setFormStep={setFormStep}
              />
            ))}

            {/* Forgot Password Link */}
            {formType === "login" && (
              <Box sx={{ textAlign: "right", mb: 3 }}>
                <TextLink to="/forgot-password" label="Forgot Password" />
              </Box>
            )}

            {/* Submit Button */}
            {formStep !== 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <SubmitButton
                  isLoading={isLoading}
                  loadingText={submitLoadingText}
                  loadedText={submitLabel}
                />
              </Box>
            )}

            {bottomTextWithLink}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
