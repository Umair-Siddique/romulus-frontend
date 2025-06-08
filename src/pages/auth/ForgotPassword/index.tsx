import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useForgotPassword } from "@refinedev/core";
import EmailIcon from "@mui/icons-material/Email";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import { ForgotPasswordVariables } from "../../../types/index.types";
import { useState } from "react";
import { Modal } from "../../../components";

export const ForgotPasswordPage = () => {
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordVariables>();

  const onSubmit = (data: ForgotPasswordVariables) => {
    forgotPassword(data, {
      onSuccess: (response) => {
        form.reset();
        if (!!response.success) {
          setShowModal(true);
        }
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
        isFormValid={form.formState.isValid}
        hasErrors={Object.keys(form.formState.errors).length > 0}
      />

      <AuthBackground backgroundImage={AuthBg} />

      {showModal && (
        <Modal
          open={true}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            form.reset();
            setShowModal(false);
          }}
          icon={<EmailIcon color="warning" fontSize="inherit" />}
          title="Check your email!"
          description="We have sent a password reset link to your email address. Please check your inbox (and spam folder, just in case)."
          showButton={false}
        />
      )}
    </Box>
  );
};
