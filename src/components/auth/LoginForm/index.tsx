import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { LoginFormData } from "../../../types/auth";
import { LoginFormFields } from "./LoginFormFields";

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => void;
  onBack?: () => void;
}

export const LoginForm = React.memo(
  ({ isLoading, onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<LoginFormData>({
      mode: "onBlur",
    });

    const handleTogglePassword = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <Box sx={{ width: "100%", maxWidth: 450 }}>
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
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            textAlign: "center",
            mb: 1,
            fontSize: "15px",
            lineHeight: 1.5,
            fontFamily: "montserrat, sans-serif",
          }}
        >
          Please log in to continue.
        </Typography>

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <LoginFormFields
            control={control}
            errors={errors}
            showPassword={showPassword}
            onTogglePassword={handleTogglePassword}
          />

          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              to="/forgot-password"
              style={{
                color: "#A1B7AF",
                textDecoration: "none",
                fontWeight: 500,
                fontFamily: "montserrat, sans-serif",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Forgot Password?
            </Link>
          </Box>

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
                boxShadow: "#A1B7AF",
                fontFamily: "montserrat, sans-serif",
              }}
            >
              {isLoading ? "Logging in..." : "Log In"}
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
            Don't have an account?{" "}
            <Link to="/register">
              <Box
                component="button"
                type="button"
                sx={{
                  color: "#A1B7AF",
                  textDecoration: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: 0,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  fontFamily: "montserrat, sans-serif",
                  fontSize: "14px",
                }}
              >
                Sign Up
              </Box>
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
);

LoginForm.displayName = "LoginForm";
