import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import TextLink from "../../../components/textLink";
import { LoginVariables } from "../../../types/index.types";
import { formFields as getStaticFields } from "../formFields";

export const LoginPage = () => {
  const theme = useTheme<Theme>();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isLoading } = useLogin<LoginVariables>();

  const onSubmit = (data: LoginVariables) => {
    login(data);
  };

  const formFields = getStaticFields("login").map((field) => ({
    ...field,
    validationRules: field.name === "email" ? validationRules.email : undefined,
    register: form.register,
    errors: form.formState.errors,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Form
        formTitle="Welcome Back!"
        formDescription="Please log in to continue."
        formFields={formFields}
        formType="login"
        isLoading={isLoading}
        bottomTextWithLink={
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              mb: theme.spacing(2),
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
