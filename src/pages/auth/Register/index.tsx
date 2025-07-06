import { useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useCustom, useRegister } from "@refinedev/core";

import AuthBg from "/images/auth-bg.jpg";
import { getFormConfig } from "./formConfig";
import { getFormFields } from "./formFields";
import { getModalConfig } from "./modalConfig";
import { Modal, AuthBackground, AuthForm } from "#components";

import { RegisterVariables } from "#types";

export const RegisterPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { refetch: sendOtp } = useCustom({
    method: "post",
    url: "/twilio/send-otp",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      payload: {
        phone: phoneNumber,
      },
    },
    queryOptions: {
      enabled: false, // Disable automatic refetching
    },
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: {
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
            form.reset();
            setPhoneNumber(data.phone || "");
            setShowModal(true);
          }
        },
        onError: (error) => {
          console.error("Error during registration:", error);
        },
      }
    );
  };

  const requestOtpAgain = async () => {
    await sendOtp();
  };

  const formConfig = getFormConfig(formStep, requestOtpAgain);
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
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <AuthForm
        formTitle={formConfig.title}
        formDescription={formConfig.description}
        formFields={getFormFields(form, formStep, userRole)}
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
        phoneNumber={phoneNumber}
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
