import { useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";
import { useUpdatePassword } from "@refinedev/core";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import { UpdatePasswordVariables } from "../../../types/index.types";
import { Modal } from "../../../components";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { formFields as getStaticFields } from "../formFields";

export const UpdatePasswordPage = () => {
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      accessToken: new URLSearchParams(window.location.search).get("accessToken") || "",
    },
  });

  const navigate = useNavigate();

  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordVariables>();

  const onSubmit = (data: UpdatePasswordVariables) => {
    const { confirmPassword, ...submitData } = data;
    updatePassword(submitData, {
      onSuccess: (response) => {
        form.reset();
        if (!!response.success) {
          setShowModal(true);
        }
      },
      onError: (error) => {
        console.error("Error updating password:", error);
      },
    });
  };

  const formFields = getStaticFields("updatePassword").map((field) => ({
    ...field,
    validationRules:
      validationRules[field.name as keyof typeof validationRules],
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
        formFields={formFields}
        formType="updatePassword"
        isLoading={isLoading}
        submitLoadingText="Saving New Password..."
        submitLabel="Save New Password"
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
            navigate("/login");
          }}
          icon={<GridCheckCircleIcon />}
          title="Password reset successfully!"
          description="Your password has been updated. You can now log in with your new password."
          buttonText="Go to login"
          showButton={true}
        />
      )}
    </Box>
  );
};
