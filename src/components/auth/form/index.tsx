import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import FormHeader from "../formHeader";
import FormField from "../formField";
import SubmitButton from "../submitButton";
import { Link } from "react-router";

type FormProps = {
  formTitle: string;
  formDescription: string;
  handleSubmit: (
    onSubmit: (data: any) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmit: (data: any) => void;
  formfields: any[];
  type: string;
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
                <Link
                  to="/forgot-password"
                  style={{
                    color: "#A1B7AF",
                    textDecoration: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    fontFamily: "montserrat, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  Forgot Password?
                </Link>
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

            {bottomTextWithLink}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
