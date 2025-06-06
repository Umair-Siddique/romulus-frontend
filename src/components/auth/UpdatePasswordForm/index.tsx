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

interface UpdatePasswordFormProps {
  isLoading: boolean;
  onSubmit: (password: string, token: string) => void;
  onBack: () => void;
}

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

export const UpdatePasswordForm = React.memo(
  ({ isLoading, onSubmit, onBack }: UpdatePasswordFormProps) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm<PasswordFormData>({
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
      mode: "onChange",
    });

    const password = watch("password");

    const handleFormSubmit = (data: PasswordFormData) => {
      // Extract token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token") || "";
      onSubmit(data.password, token);
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
          Reset Password
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
          Enter your new password below to complete the reset process.
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Password Field */}
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
            New Password
          </Typography>

          <Controller
            name="password"
            control={control}
            rules={validationRules.password}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Enter your new password"
                type="password"
                error={!!errors.password}
                sx={{
                  mb: errors.password ? 1 : 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "#fafafa",
                    "& fieldset": {
                      borderColor: errors.password ? "#d32f2f" : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.password ? "#d32f2f" : "#A1B7AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.password ? "#d32f2f" : "#A1B7AF",
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

          {errors.password && (
            <FormHelperText error sx={{ mb: 2, ml: 1 }}>
              {errors.password.message}
            </FormHelperText>
          )}

          {/* Confirm Password Field */}
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
            Confirm Password
          </Typography>

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Confirm your new password"
                type="password"
                error={!!errors.confirmPassword}
                sx={{
                  mb: errors.confirmPassword ? 1 : 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "#fafafa",
                    "& fieldset": {
                      borderColor: errors.confirmPassword
                        ? "#d32f2f"
                        : "#e0e0e0",
                    },
                    "&:hover fieldset": {
                      borderColor: errors.confirmPassword
                        ? "#d32f2f"
                        : "#A1B7AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errors.confirmPassword
                        ? "#d32f2f"
                        : "#A1B7AF",
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

          {errors.confirmPassword && (
            <FormHelperText error sx={{ mb: 2, ml: 1 }}>
              {errors.confirmPassword.message}
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
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }
);

UpdatePasswordForm.displayName = "UpdatePasswordForm";
