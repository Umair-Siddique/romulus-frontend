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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordVariables>();

  const onSubmit = async (data: ForgotPasswordVariables) => {
    forgotPassword(data, {
      onSuccess: () => {
        reset();
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
      register,
      errors,
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
      {/* Left Side - Form */}
      <Form
        formTitle="Forgot Password?"
        formDescription="Enter the email address associated with your account, and we'll send you a link to reset it."
        formfields={formFields}
        formType="forgotPassword"
        isLoading={isLoading}
        submitLoadingText="Sending Reset Link..."
        submitLabel="Send Reset Link"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
