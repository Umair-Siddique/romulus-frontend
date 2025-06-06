import React, { useState } from "react";
import { useForgotPassword } from "@refinedev/core";
import { Box } from "@mui/material";
import { Email, ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router";

import AuthBg from "../../../assets/images/auth-bg.jpg";
import Logo from "../../../assets/images/logo.png";
import {
  AuthBackground,
  ForgotPasswordForm,
  Modal,
} from "../../../components/auth";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: forgotPassword } = useForgotPassword();

  const handleEmailSubmit = (submittedEmail: string) => {
    setIsLoading(true);
    setEmail(submittedEmail);
    // setShowModal(false);
    // setIsSuccess(false);

    forgotPassword(
      { email: submittedEmail },
      {
        onSuccess: (res) => {
          console.log("Response:", res);
          if (res.success === false) {
            setIsSuccess(false);
            setShowModal(true);
            setIsLoading(false);
            return;
          }
          setIsSuccess(true);
          setShowModal(true);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error", error);
          setIsSuccess(false);
          setShowModal(true);
          setIsLoading(false);
        },
      }
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/login");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, md: 6 },
          py: 4,
          backgroundColor: "#ffffff",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
          <Box component={"img"} src={Logo} alt="Logo" />
        </Box>

        {/* Form Container */}
        <Box sx={{ width: "100%", maxWidth: 450, mx: "auto" }}>
          <ForgotPasswordForm
            isLoading={isLoading}
            onSubmit={handleEmailSubmit}
            onBack={handleBackToLogin}
          />
        </Box>
      </Box>

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />

      {/* Modal */}
      <Modal
        open={showModal}
        onClose={handleModalClose}
        icon={
          isSuccess ? (
            <Email />
          ) : (
            <ErrorOutline sx={{ color: "red", fontSize: "70px" }} />
          )
        }
        title={
          isSuccess
            ? "Reset Email Sent Successfully!"
            : "Failed to Send Reset Email"
        }
        description={
          isSuccess
            ? `We've sent a password reset link to ${email}. Please check your email and follow the instructions to reset your password.`
            : "There was an error sending the reset email. Please try again later or contact support if the problem persists."
        }
        buttonText={isSuccess ? "Back to Login" : "Try Again"}
      />
    </Box>
  );
};
