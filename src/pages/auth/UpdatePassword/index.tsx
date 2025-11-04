import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useUpdatePassword } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

import AuthBg from "/images/auth-bg.jpg";
import { validationRules } from "#lib";
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
        formTitle="Réinitialiser votre mot de passe"
        formDescription="Choisissez un nouveau mot de passe qui est sécurisé et facile à retenir."
        formFields={formFields}
        formType="updatePassword"
        isLoading={isLoading}
        submitLoadingText="Enregistrement du nouveau mot de passe..."
        submitLabel="Enregistrer le nouveau mot de passe"
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
          title="Réinitialisation du mot de passe réussie!"
          description="Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe."
          buttonText="Aller à la connexion"
          hasButton={true}
          hasAdditionalElements={false}
        />
      )}
    </Box>
  );
};
