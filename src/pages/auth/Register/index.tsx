import { useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useRegister } from "@refinedev/core";

import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import { Modal } from "../../../components";
import { RegisterVariables } from "../../../types/index.types";
import { getFormFields } from "./formFields";
import { getFormConfig } from "./formConfig";
import { getModalConfig } from "./modalConfig";

export const RegisterPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "",
      toc: false,
    },
  });

  const { mutate: signup, isLoading } = useRegister<RegisterVariables>();

  const onSubmit = async (data: RegisterVariables) => {
    signup(
      {
        ...data,
        role: userRole,
        confirmPassword: undefined,
        toc: undefined,
        phone: userRole === "educator" ? data.phone : undefined,
      },
      {
        onSuccess: (response) => {
          if (!!response.success) {
            setShowModal(true);
          }
        },
        onError: (error) => {
          console.error("Error during registration:", error);
        },
      }
    );
  };

  const formConfig = getFormConfig(formStep);
  const modalConfig = getModalConfig(
    form,
    setFormStep,
    formStep,
    userRole,
    setShowModal
  );

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
        formTitle={formConfig.title}
        formDescription={formConfig.description}
        formfields={getFormFields(form, formStep, userRole)}
        formType="register"
        formStep={formStep}
        setFormStep={setFormStep}
        setUserRole={setUserRole}
        isLoading={isLoading}
        bottomTextWithLink={formConfig.bottomContent}
        submitLoadingText={formConfig.submitLoadingText}
        submitLabel={formConfig.submitLabel}
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
        isFormValid={form.formState.isValid}
        hasErrors={Object.keys(form.formState.errors).length > 0}
      />

      <AuthBackground backgroundImage={AuthBg} />

      {showModal && (
        <Modal
          open={modalConfig.open}
          onClose={modalConfig.onClose}
          onSubmit={modalConfig.onSubmit}
          icon={modalConfig.icon}
          title={modalConfig.title}
          description={modalConfig.description}
          buttonText={modalConfig.buttonText}
          showButton={!!modalConfig.buttonText}
        />
      )}
    </Box>
  );
};
