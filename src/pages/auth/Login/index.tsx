import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useLogin } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { useState } from "react";

import AuthBg from "/images/auth-bg.jpg";
import { useUserContext } from "#context";
import { validationRules } from "#lib";
import { formFields as getStaticFields } from "../formFields";
import { AuthBackground, AuthForm, TextLink } from "#components";

import { LoginVariables } from "#types";

type LoginPhase = "idle" | "logging-in" | "complete";

export const LoginPage = () => {
  const theme = useTheme<Theme>();
  const { setUser } = useUserContext();

  const [loginPhase, setLoginPhase] = useState<LoginPhase>("idle");

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useLogin<LoginVariables>();

  const onSubmit = (data: LoginVariables) => {
    setLoginPhase("logging-in");

    login(data, {
      onSuccess: (response: any) => {
        if (response.error) {
          setLoginPhase("complete");
          return;
        }

        const { data: loginData } = response;

        setUser(loginData);
        setLoginPhase("complete");
      },
      onError: (error) => {
        setLoginPhase("complete");
        return;
      },
    });
  };

  const formFields = getStaticFields("login").map((field) => ({
    ...field,
    validationRules: field.name === "email" ? validationRules.email : undefined,
    register: form.register,
    errors: form.formState.errors,
  }));

  const isLoading = loginPhase === "logging-in";
  const getLoadingText = () => {
    return loginPhase === "logging-in" ? "Logging in..." : "Log In";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <AuthForm
        formTitle="Bienvenue à nouveau !"
        formDescription="Veuillez vous connecter pour continuer."
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
            Vous n'avez pas de compte ?{" "}
            <TextLink to="/register" label="S'inscrire" />
          </Typography>
        }
        submitLoadingText={getLoadingText()}
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
