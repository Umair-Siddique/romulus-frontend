import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import TextLink from "../../../components/textLink";
import { LoginVariables } from "../../../types/index.types";

export const LoginPage = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isLoading } = useLogin<LoginVariables>();

  const onSubmit = (data: LoginVariables) => {
    login(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error("Error logging in:", error);
      },
    });
  };

  const formFields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      validationRules: validationRules.email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      validationRules: validationRules.password,
    },
  ].map((field) => ({
    ...field,
    register: form.register,
    errors: form.formState.errors,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <Form
        formTitle="Welcome Back!"
        formDescription="Please log in to continue."
        formfields={formFields}
        formType="login"
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
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
        isFormValid={form.formState.isValid}
        hasErrors={Object.keys(form.formState.errors).length > 0}
      />

      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
