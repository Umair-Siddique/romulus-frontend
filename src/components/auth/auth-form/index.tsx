import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useCustom } from "@refinedev/core";
import { Cancel as CancelIcon } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

import { Modal } from "../../Modal";
import logoImage from "/images/logo.png";
import { TextLink } from "../../TextLink";
import AuthFormField from "./auth-form-field";
import AuthFormHeader from "./AuthFormHeader";
import AuthSubmitButton from "./AuthSubmitButton";

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
    hasButton: true,
    onSubmit: () => {},
  });

  const [verificationCode, setVerificationCode] = useState<string[]>();
  const showForgotPassword = formType === "login";

  const { refetch: verifyOtp } = useCustom({
    method: "post",
    url: "/twilio/verify-otp",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
      payload: {
        phone: phoneNumber,
        code: verificationCode?.join(""),
      },
    },
    queryOptions: {
      enabled: false, // Disable automatic refetching
    },
  });

  const showSubmitButton = formStep !== 1;
  const navigate = useNavigate();

  const isButtonDisabled = !isFormValid || hasErrors || isLoading;

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, open: false }));
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await verifyOtp();

      if ((result as any)?.data?.error) {
        setVerificationCode([]);
        setModalConfig({
          open: true,
          icon: <CancelIcon color="error" fontSize="inherit" />,
          title: "La vérification du code OTP a échoué",
          description: "Veuillez vérifier votre code OTP et réessayer.",
          buttonText: "Réessayer",
          hasButton: true,
          onSubmit: closeModal,
        });
      } else if (result) {
        setVerificationCode([]);
        setModalConfig({
          open: true,
          icon: <GridCheckCircleIcon />,
          title: "OTP vérifié avec succès !",
          description:
            "Vous êtes prêt. Vous pouvez maintenant vous connecter à votre compte.",
          buttonText: "Aller à la connexion",
          hasButton: true,
          onSubmit: () => {
            closeModal();
            navigate("/login");
          },
        });
      } else {
        setModalConfig({
          open: true,
          icon: <CancelIcon color="error" fontSize="inherit" />,
          title: "La vérification du code OTP a échoué",
          description: "Veuillez vérifier votre code OTP et réessayer.",
          buttonText: "réessayer",
          hasButton: true,
          onSubmit: closeModal,
        });
      }
    } catch (error) {
      setModalConfig({
        open: true,
        icon: <CancelIcon color="error" fontSize="inherit" />,
        title: "La vérification du code OTP a échoué",
        description: "Veuillez vérifier votre code OTP et réessayer.",
        buttonText: "réessayer",
        hasButton: true,
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
      <Box component="img" src={logoImage} width={115} />

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
              <TextLink to="/forgot-password" label="Mot de passe oublié" />
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
                        void handleVerifyOtp();
                      }
                    : undefined
                }
                isDisabled={isButtonDisabled}
                isLoading={isLoading}
                loadingText={
                  formStep === 3 ? "Vérification..." : submitLoadingText
                }
                loadedText={
                  formStep === 3 ? "Vérifier le code OTP" : submitLabel
                }
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
        hasButton={modalConfig.hasButton}
        hasAdditionalElements={false}
      />
    </Box>
  );
};
