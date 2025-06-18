import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import FormHeader from "../formHeader";
import FormField from "../formField";
import SubmitButton from "../submitButton";
import TextLink from "../../textLink";
import { FormProps } from "../../../interface";
import { api } from "../../../utils";
import { useNavigate } from "react-router";
import { Modal } from "../../../components";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";

export const Form: React.FC<FormProps> = ({
  formTitle,
  formDescription,
  formfields,
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
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    open: false,
    onClose: () => setShowModal(false),
    onSubmit: () => setShowModal(false),
    icon: <GridCheckCircleIcon />,
    title: "OTP verified successfully!",
    description: "You're all set. You can now log in to your account.",
    buttonText: "Go to Login",
    showButton: true,
  });

  const [verificationCode, setVerificationCode] = React.useState<string[]>();
  const showForgotPassword = formType === "login";
  const showSubmitButton = formStep !== 1;

  const navigate = useNavigate();

  const isButtonDisabled = !isFormValid || hasErrors || isLoading;

  const verifyOtp = async () => {
    try {
      const res = await api.post("/twilio/verify-otp", {
        phone: phoneNumber,
        code: verificationCode?.join(""),
      });

      if (res.data.success) {
        navigate("/login"); // Move to the next step after successful verification
        setVerificationCode([]);
        setModalConfig({
          open: true,
          icon: <GridCheckCircleIcon />,
          onClose: () => setShowModal(false),
          onSubmit: () => navigate("/login"),
          title: "OTP verified successfully!",
          description: "You're all set. You can now log in to your account.",
          buttonText: "Go to Login",
          showButton: true,
        });
        setShowModal(true);
      } else {
        setModalConfig({
          open: true,
          icon: <CancelIcon />,
          onClose: () => setShowModal(false),
          onSubmit: () => setShowModal(false),
          title: "OTP verification failed",
          description: "Please check your OTP and try again.",
          buttonText: "Retry",
          showButton: true,
        });
      }
    } catch (error) {
      setModalConfig({
        open: true,
        icon: <CancelIcon />,
        onClose: () => setShowModal(false),
        onSubmit: () => setShowModal(false),
        title: "OTP verification failed",
        description: "Please check your OTP and try again.",
        buttonText: "Retry",
        showButton: true,
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
        px: { xs: 3, md: 6 },
        py: 4,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo - Fixed to top */}
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Box component="img" src={Logo} alt="Logo" />
      </Box>

      {/* Content Container - Centered vertically in remaining space */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: 600,
          maxWidth: "100%",
        }}
      >
        {/* Form Header */}
        <FormHeader title={formTitle} description={formDescription} />

        {/* Form Fields */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate // Prevent browser validation
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {formfields.map((field, index) => (
            <FormField
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
                mb: 3,
              }}
            >
              <TextLink to="/forgot-password" label="Forgot Password" />
            </Box>
          )}

          {/* Submit Button */}
          {showSubmitButton && formStep !== 3 ? (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <SubmitButton
                isDisabled={isButtonDisabled}
                isLoading={isLoading}
                loadingText={submitLoadingText}
                loadedText={submitLabel}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Button
                type="button"
                variant="contained"
                onClick={verifyOtp}
                sx={{
                  background: "#A1B7AF",
                  py: 1.8,
                  px: 6,
                  width: 300,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: 4,
                  boxShadow: "#A1B7AF",
                  fontFamily: "montserrat, sans-serif",
                  "&:hover": {
                    background: "#8fa89f",
                  },
                }}
              >
                Verify OTP
              </Button>{" "}
            </Box>
          )}
        </Box>

        {bottomTextWithLink}
      </Box>

      {showModal && (
        <Modal
          open={modalConfig.open}
          onClose={modalConfig.onClose}
          onSubmit={modalConfig.onSubmit}
          icon={modalConfig.icon}
          title={modalConfig.title}
          description={modalConfig.description}
          buttonText={modalConfig.buttonText}
          showButton={modalConfig.showButton}
        />
      )}
    </Box>
  );
};
