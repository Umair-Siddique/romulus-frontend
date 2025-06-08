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
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: new URLSearchParams(window.location.search).get("token") || "",
    },
  });

  const { mutate: updatePassword, isLoading } = useUpdatePassword<UpdatePasswordVariables>();

  const onSubmit = (data: UpdatePasswordVariables) => {
    const { confirmPassword, ...submitData } = data;
    updatePassword(submitData, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error("Error updating password:", error);
      },
    });
  };

  const formFields = [
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      validationRules: validationRules.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Re-enter your password",
      validationRules: validationRules.confirmPassword,
    },
  ].map(field => ({
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
        formTitle="Reset your password"
        formDescription="Choose a new password that is secure and easy to remember."
        formfields={formFields}
        formType="updatePassword"
        isLoading={isLoading}
        submitLoadingText="Saving New Password..."
        submitLabel="Save New Password"
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
      />

      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};