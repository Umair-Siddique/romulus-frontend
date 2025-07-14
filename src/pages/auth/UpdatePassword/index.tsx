import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useUpdatePassword } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

import AuthBg from "/images/auth-bg.jpg";
import { validationRules } from "#constants";
import { Modal, AuthBackground, AuthForm } from "#components";
import { formFields as getStaticFields } from "../formFields";

import { UpdatePasswordVariables } from "#types";

export const UpdatePasswordPage = () => {
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      resetToken:
        new URLSearchParams(window.location.search).get("resetToken") || "",
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
        if (response.error) {
          setShowModal(true);
          console.log(response.error);
          return;
        }
      },
      onError: (error) => {
        console.log("Error updating password:", error);
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
      <AuthForm
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
          hasAdditionalElements={false}
        />
      )}
    </Box>
  );
};
