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
  formStep?: number;
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  isLoading?: boolean;
  submitLoadingText?: string;
  submitLabel?: string;
  bottomTextWithLink?: React.ReactNode;
  handleSubmit?: any;
  onSubmit?: (data: any) => void;
}

export const Form: React.FC<FormProps> = ({
  formTitle,
  formDescription,
  formfields,
  formType,
  formStep,
  setFormStep = () => {},
  setUserRole = () => {},
  isLoading,
  submitLoadingText = "Loading...",
  submitLabel = "Submit",
  bottomTextWithLink,
  handleSubmit = () => {},
  onSubmit = () => {},
}) => {
  const showForgotPassword = formType === "login";
  const showSubmitButton = formStep !== 1;

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 3, md: 6 },
        py: 4,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo - Fixed to top */}
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Box component="img" src={Logo} alt="Logo" />
      </Box>

      {/* Content Container - Centered vertically in remaining space */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: 600,
          maxWidth: "100%",
        }}
      >
        {/* Form Header */}
        <FormHeader title={formTitle} description={formDescription} />

        {/* Form Fields */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate // Prevent browser validation
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {formfields.map((field, index) => (
            <FormField
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              options={field.options}
              validationRules={field.validationRules}
              setFormStep={setFormStep}
              setUserRole={setUserRole}
              register={field.register}
              errors={field.errors}
            />
          ))}

          {/* Forgot Password Link */}
          {showForgotPassword && (
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "end",
                mb: 3,
              }}
            >
              <TextLink to="/forgot-password" label="Forgot Password" />
            </Box>
          )}

          {/* Submit Button */}
          {showSubmitButton && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <SubmitButton
                isLoading={isLoading}
                loadingText={submitLoadingText}
                loadedText={submitLabel}
              />
            </Box>
          )}
        </Box>

        {bottomTextWithLink}
      </Box>
    </Box>
  );
};
