import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";

import { AuthBackground } from "../../../components/auth";
import { validationRules } from "../../../constants/validation";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import Form from "../../../components/auth/form";
import TextLink from "../../../components/textLink";

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

  const onSubmit = async (data: LoginVariables) => {
    login(data);
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
      {/* Left Side - Form */}
      <Form
        formTitle="Welcome Back!"
        formDescription="Please log in to continue."
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        formfields={formfields}
        type="login"
        isLoading={isLoading}
        bottomTextWithLink={
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
            Don't have an account? <TextLink to="/register" label="Sign Up" />
          </Typography>
        }
        submitLoadingText="Logging in..."
        submitLabel="Log In"
      />

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
