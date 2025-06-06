import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormHelperText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { validationRules } from "../../../constants/validation";

interface ForgotPasswordEmailFormProps {
  isLoading: boolean;
  onSubmit: (email: string) => void;
  onBack: () => void;
}

interface EmailFormData {
  email: string;
}

export const ForgotPasswordForm = React.memo(
  ({ isLoading, onSubmit, onBack }: ForgotPasswordEmailFormProps) => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<EmailFormData>({
      defaultValues: {
        email: "",
      },
      mode: "onChange",
    });

    const handleFormSubmit = (data: EmailFormData) => {
      onSubmit(data.email);
    };

    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: "1px solid #e0e0e0",
          borderRadius: 3,
        }}
      >
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
            Back to Login
          </Button>
        </Box>

        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 700,
            color: "#333",
            fontFamily: "inter, sans-serif",
          }}
        >
          Forgot Password?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#666",
            fontFamily: "inter, sans-serif",
          }}
        >
          Enter your email address and we'll send you a verification code to
          reset your password.
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: "#333",
              fontWeight: 500,
              fontSize: "14px",
              fontFamily: "inter, sans-serif",
            }}
          >
            Email Address
          </Typography>

          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Enter your email address"
                type="email"
                error={!!errors.email}
                sx={{
                  mb: errors.email ? 1 : 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "#fafafa",
                    "& fieldset": {
                      borderColor: errors.email ? "#d32f2f" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.email ? "#d32f2f" : "#A1B7AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.email ? "#d32f2f" : "#A1B7AF",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    py: 1.5,
                  },
                  fontFamily: "inter, sans-serif",
                  fontSize: "14px",
                }}
              />
            )}
          />

          {errors.email && (
            <FormHelperText error sx={{ mb: 2, ml: 1 }}>
              {errors.email.message}
            </FormHelperText>
          )}

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
                fontFamily: "montserrat, sans-serif",
                "&:hover": {
                  backgroundColor: "#A1B7AF",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                },
              }}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }
);

ForgotPasswordForm.displayName = "ForgotPasswordForm";
