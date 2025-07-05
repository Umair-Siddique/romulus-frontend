import { useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";

import { httpClient } from "#utils";
import { Modal } from "../../Modal";
import TextLink from "../../TextLink";
import logoImage from "/images/logo.png";
import AuthFormField from "./auth-form-field";
import AuthFormHeader from "./auth-form-header";
import AuthSubmitButton from "./auth-submit-button";
import { LogoComponent } from "../../LogoComponent";

import { AuthFormProps } from "#types";

export const AuthForm = ({
  formTitle,
  formDescription,
  formFields,
  formType,
  formStep,
  setFormStep = () => {},
  setUserRole = () => {},
  isLoading,
  submitLoadingText = "Loading...",
  submitLabel = "Submit",
  bottomTextWithLink,
  handleSubmit = () => {},
  onSubmit = () => {},
  isFormValid,
  hasErrors,
  phoneNumber,
}: AuthFormProps) => {
  const theme = useTheme<Theme>();

  const [modalConfig, setModalConfig] = useState({
    open: false,
    icon: <GridCheckCircleIcon />,
    title: "",
    description: "",
    buttonText: "OK",
    showButton: true,
    onSubmit: () => {},
  });

  const [verificationCode, setVerificationCode] = useState<string[]>();
  const showForgotPassword = formType === "login";
  const showSubmitButton = formStep !== 1;

  const navigate = useNavigate();

  const isButtonDisabled = !isFormValid || hasErrors || isLoading;

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, open: false }));
  };

  const verifyOtp = async () => {
    try {
      const res = await httpClient.post("/twilio/verify-otp", {
        phone: phoneNumber,
        code: verificationCode?.join(""),
      });

      if (res.data.success) {
        setVerificationCode([]);
        setModalConfig({
          open: true,
          icon: <GridCheckCircleIcon />,
          title: "OTP verified successfully!",
          description: "You're all set. You can now log in to your account.",
          buttonText: "Go to Login",
          showButton: true,
          onSubmit: () => {
            closeModal();
            navigate("/login");
          },
        });
      } else {
        setModalConfig({
          open: true,
          icon: <CancelIcon color="error" fontSize="inherit" />,
          title: "OTP verification failed",
          description: "Please check your OTP and try again.",
          buttonText: "Retry",
          showButton: true,
          onSubmit: closeModal,
        });
      }
    } catch (error) {
      setModalConfig({
        open: true,
        icon: <CancelIcon color="error" fontSize="inherit" />,
        title: "OTP verification failed",
        description: "Please check your OTP and try again.",
        buttonText: "Retry",
        showButton: true,
        onSubmit: closeModal,
      });
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: theme.spacing(3), md: theme.spacing(6) },
        py: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* LogoComponent - Fixed to top */}
      <LogoComponent logoImage={logoImage} width={115} />

      {/* Content Container - Centered vertically in remaining space */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: theme.spacing(75), // 600px equivalent using theme spacing (600/8 = 75)
          maxWidth: "100%",
        }}
      >
        {/* Form Header */}
        <AuthFormHeader
          title={formTitle ?? ""}
          description={formDescription ?? ""}
        />

        {/* Form Fields */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate // Prevent browser validation
          sx={{
            mt: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {formFields.map((field, index) => (
            <AuthFormField
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              options={field.options}
              validationRules={field.validationRules}
              setFormStep={setFormStep}
              setUserRole={setUserRole}
              register={field.register}
              errors={field.errors}
              setVerificationCode={setVerificationCode}
            />
          ))}

          {/* Forgot Password Link */}
          {showForgotPassword && (
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "end",
                mb: theme.spacing(3),
              }}
            >
              <TextLink to="/forgot-password" label="Forgot Password" />
            </Box>
          )}

          {/* Submit Button */}
          {showSubmitButton && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: theme.spacing(3),
              }}
            >
              <AuthSubmitButton
                type={formStep === 3 ? "button" : "submit"}
                onClick={
                  formStep === 3
                    ? () => {
                        void verifyOtp();
                      }
                    : undefined
                }
                isDisabled={isButtonDisabled}
                isLoading={isLoading}
                loadingText={
                  formStep === 3 ? "Verifying..." : submitLoadingText
                }
                loadedText={formStep === 3 ? "Verify OTP" : submitLabel}
              />
            </Box>
          )}
        </Box>

        {bottomTextWithLink}
      </Box>

      <Modal
        open={modalConfig.open}
        onClose={closeModal}
        onSubmit={modalConfig.onSubmit}
        icon={modalConfig.icon}
        title={modalConfig.title}
        description={modalConfig.description}
        buttonText={modalConfig.buttonText}
        showButton={modalConfig.showButton}
      />
    </Box>
  );
};

AuthForm.displayName = "AuthForm";
