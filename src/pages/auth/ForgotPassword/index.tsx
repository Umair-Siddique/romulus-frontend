import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useForgotPassword } from "@refinedev/core";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";

type ForgotPasswordVariables = {
  email: string;
};

export const ForgotPasswordPage = () => {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isLoading } = useForgotPassword<ForgotPasswordVariables>();

  const onSubmit = (data: ForgotPasswordVariables) => {
    forgotPassword(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error("Error sending reset link:", error);
      },
    });
  };

  const formFields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      register: form.register,
      errors: form.formState.errors,
      validationRules: validationRules.email,
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
      <Form
        formTitle="Forgot Password?"
        formDescription="Enter the email address associated with your account, and we'll send you a link to reset it."
        formfields={formFields}
        formType="forgotPassword"
        isLoading={isLoading}
        submitLoadingText="Sending Reset Link..."
        submitLabel="Send Reset Link"
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
      />

      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};