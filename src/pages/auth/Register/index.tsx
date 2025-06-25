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
import { api } from "../../../utils";

export const RegisterPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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
    await api.post("/twilio/send-otp", {
      phone: phoneNumber,
    });
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
      <Form
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
