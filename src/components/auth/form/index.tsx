import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import FormHeader from "../formHeader";
import FormField from "../formField";
import SubmitButton from "../submitButton";

type FormProps = {
  formTitle: string;
  formDescription: string;
  handleSubmit: (
    onSubmit: (data: any) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmit: (data: any) => void;
  formfields: any[];
  type: string;
  handleForgotPassword?: () => void;
  isLoading?: boolean;
  bottomTextWithLink?: React.ReactNode;
};

const Form: React.FC<FormProps> = ({
  formTitle,
  formDescription,
  handleSubmit,
  onSubmit,
  formfields,
  type,
  handleForgotPassword = undefined,
  isLoading,
  bottomTextWithLink = undefined,
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
        {/* Login Form Content */}
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          {/* Form Header */}
          <FormHeader title={formTitle} description={formDescription} />

          {/* Login Form */}
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
                register={field.register}
                errors={field.errors}
                validationRules={field.validationRules}
              />
            ))}

            {/* Forgot Password Link */}
            {type === "login" && (
              <Box sx={{ textAlign: "right", mb: 3 }}>
                <Typography
                  component="button"
                  type="button"
                  onClick={handleForgotPassword}
                  sx={{
                    color: "#A1B7AF",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontFamily: "montserrat, sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <SubmitButton
                isLoading={isLoading}
                loadingText="Logging in..."
                loadedText="Log In"
              />
            </Box>

            {/* Sign Up Link */}
            {bottomTextWithLink}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
