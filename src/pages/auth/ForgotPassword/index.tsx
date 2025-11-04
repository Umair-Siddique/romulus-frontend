import { useState } from "react";
import { Box } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { useForgotPassword } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import AuthBg from "/images/auth-bg.jpg";
import { validationRules } from "#lib";
import { Modal, AuthBackground, AuthForm } from "#components";
import { formFields as getStaticFields } from "../formFields";

import { ForgotPasswordVariables } from "#types";

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
        if (response.error) {
          form.setError("email", {
            type: "manual",
            message: response.error.message,
          });

          return;
        }

        form.reset();
        if (!!response.success) {
          setShowModal(true);
        }
      },
      onError: (error) => {
        console.log("Error sending reset link:", error);
      },
    });
  };

  const formFields = getStaticFields("forgotPassword").map((field) => ({
    ...field,
    validationRules: validationRules.email,
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
        formTitle="Mot de passe oublié ?"
        formDescription="Entrez l'adresse e-mail associée à votre compte, et nous vous enverrons un lien pour le réinitialiser."
        formFields={formFields}
        formType="forgotPassword"
        isLoading={isLoading}
        submitLoadingText="Envoi du lien de réinitialisation..."
        submitLabel="Envoyer le lien de réinitialisation"
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
          title="Vérifiez votre e-mail !"
          description="Nous avons envoyé un lien de réinitialisation de mot de passe à votre adresse e-mail. Veuillez vérifier votre boîte de réception (et votre dossier de spam, juste au cas où)."
          hasButton={false}
          hasAdditionalElements={false}
        />
      )}
    </Box>
  );
};
