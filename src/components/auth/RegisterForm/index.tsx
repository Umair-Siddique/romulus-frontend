import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "../../../interface/auth";
import { RegisterFormFields } from "./RegisterFormFields";
import { ArrowBack } from "@mui/icons-material";

interface RegisterFormProps {
  userType: string;
  isLoading: boolean;
  onSubmit: (data: RegisterFormData) => void;
  onBack: () => void;
  selectedUserType?: string | null;
}

export const RegisterForm = React.memo(
  ({
    userType,
    isLoading,
    onSubmit,
    onBack,
    selectedUserType,
  }: RegisterFormProps) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm<RegisterFormData>({
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        role: userType || "",
        agreeToTerms: false,
        // Only add phone for educator
        ...(userType === "educator" && {
          phone: "",
        }),
      },
      mode: "onChange",
    });

    const password = watch("password");

    const handleFormSubmit = React.useCallback(
      (data: RegisterFormData) => {
        // Use selectedUserType if available, otherwise fall back to userType
        const finalUserType = selectedUserType || userType;

        // Filter out validation-only fields from the payload
        const { confirmPassword, agreeToTerms, ...payloadData } = data;

        // Send the filtered payload
        onSubmit({ ...payloadData, role: finalUserType });
      },
      [onSubmit, selectedUserType, userType]
    );

    return (
      <>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              color: "#666",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(50, 177, 235, 0.08)",
              },
              fontFamily: "inter, sans-serif",
            }}
          >
            Back to User Type Selection
          </Button>
        </Box>

        {/* Welcome Text */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            textAlign: "center",
            mb: 1,
            color: "#1a1a1a",
            fontSize: { xs: "28px", md: "32px" },
            fontFamily: "montserrat, sans-serif",
          }}
        >
          Create Your{" "}
          {(selectedUserType || userType) === "educator"
            ? "Educator"
            : "Organization"}{" "}
          Account
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            textAlign: "center",
            mb: 3,
            fontSize: "15px",
            lineHeight: 1.5,
            fontFamily: "montserrat, sans-serif",
          }}
        >
          Fill in your details to sign up as an{" "}
          {(selectedUserType || userType) === "educator"
            ? "educator"
            : "organization"}{" "}
        </Typography>

        {/* Registration Form */}
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <RegisterFormFields
            control={control}
            errors={errors}
            userType={selectedUserType || userType}
            password={password}
          />

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !isValid}
              sx={{
                background: "#A1B7AF",
                py: 1.8,
                px: 6,
                width: "85%",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: 4,
                boxShadow: "none",
                fontFamily: "montserrat, sans-serif",
                "&:hover": {
                  background: "#8fa599",
                },
                "&:disabled": {
                  background: "#d0d0d0",
                  color: "#888",
                },
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              mb: 2,
              fontSize: "14px",
              fontFamily: "inter, sans-serif",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              sx={{
                color: "#A1B7AF",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
                fontFamily: "montserrat, sans-serif",
                fontSize: "14px",
              }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </>
    );
  }
);

RegisterForm.displayName = "RegisterForm";
