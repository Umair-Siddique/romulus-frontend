import React, { useState, useEffect } from "react";
import { useUpdatePassword } from "@refinedev/core";
import { Box } from "@mui/material";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router";

import AuthBg from "../../../assets/images/auth-bg.jpg";
import Logo from "../../../assets/images/logo.png";
import {
  AuthBackground,
  UpdatePasswordForm,
  Modal,
} from "../../../components/auth";

type UpdatePasswordVariables = {
  password: string;
  token: string;
};

export const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: updatePassword } =
    useUpdatePassword<UpdatePasswordVariables>();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      navigate("/forgot-password");
    }
  }, [searchParams, navigate]);

  const handlePasswordUpdate = (password: string, token: string) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    setIsLoading(true);
    setShowModal(false);
    setIsSuccess(false);

    updatePassword(
      {
        password,
        token,
      },
      {
        onSuccess: (res) => {
          setIsSuccess(true);
          setShowModal(true);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Failed to reset password:", error);
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

  // Don't render the form if there's no token
  if (!token) {
    return null;
  }

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
          <UpdatePasswordForm
            isLoading={isLoading}
            onSubmit={handlePasswordUpdate}
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
            <CheckCircle sx={{ color: "#4caf50" }} />
          ) : (
            <ErrorOutline sx={{ color: "#f44336" }} />
          )
        }
        title={
          isSuccess
            ? "Password Reset Successfully!"
            : "Failed to Reset Password"
        }
        description={
          isSuccess
            ? "Your password has been reset successfully. You can now log in with your new password."
            : "There was an error resetting your password. The link may have expired or been used already. Please try requesting a new reset link."
        }
        buttonText={isSuccess ? "Back to Login" : "Try Again"}
      />
    </Box>
  );
};
