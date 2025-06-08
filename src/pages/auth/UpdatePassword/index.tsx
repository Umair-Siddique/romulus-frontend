import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useUpdatePassword } from "@refinedev/core";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";

type UpdatePasswordVariables = {
  password: string;
  confirmPassword?: string;
  token: string;
};

export const UpdatePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: new URLSearchParams(window.location.search).get("token") || "",
    },
  });

  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordVariables>();

  const onSubmit = async (data: UpdatePasswordVariables) => {
    updatePassword(
      { ...data, confirmPassword: undefined },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("Error sending reset link:", error);
        },
      }
    );
  };

  const formFields = [
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      register,
      errors,
      validationRules: validationRules.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Re-enter your password",
      register,
      errors,
      validationRules: validationRules.confirmPassword,
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
        formTitle="Reset your password"
        formDescription="Choose a new password that is secure and easy to remember."
        formfields={formFields}
        formType="updatePassword"
        isLoading={isLoading}
        submitLoadingText="Saving New Password..."
        submitLabel="Save New Password"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
