import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";
import { AuthBackground } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import Logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { validationRules } from "../../../constants/validation";
import FormHeader from "../../../components/auth/formHeader";
import FormField from "../../../components/auth/formField";
import SubmitButton from "../../../components/auth/submitButton";

type LoginVariables = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isLoading } = useLogin<LoginVariables>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginVariables) => {
    login(data);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const formfields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      register,
      errors,
      validationRules: validationRules.email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      register,
      errors,
      validationRules: validationRules.password,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Side - Login Form */}
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
            <FormHeader
              title="Welcome Back!"
              description="Please log in to continue."
            />

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

              {/* Submit Button */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Logging in..."
                  loadedText="Log In"
                />
              </Box>

              {/* Sign Up Link */}
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
                <Typography
                  component="button"
                  type="button"
                  onClick={handleSignUp}
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
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
