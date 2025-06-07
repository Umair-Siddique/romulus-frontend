import React, { useState } from "react";
import { Box } from "@mui/material";
import { Email, WhatsApp } from "@mui/icons-material";
import { useParams, useLocation, useNavigate } from "react-router";
import { useRegister } from "@refinedev/core";
import { useSearchParams } from "react-router";

import AuthBg from "../../../assets/images/auth-bg.jpg";
import Logo from "../../../assets/images/logo.png";
import {
  AuthBackground,
  RegisterForm,
  UserTypeSelection,
} from "../../../components/auth";
import { RegisterFormData } from "../../../interface/auth";
import { Modal } from "../../../components";

export const RegisterPage = () => {
  const { userType: urlUserType } = useParams<{ userType: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [showEducatorModal, setShowEducatorModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = React.useState(false);
  const [selectedUserType, setSelectedUserType] = React.useState<string | null>(
    null
  );
  const [registrationData, setRegistrationData] =
    useState<RegisterFormData | null>(null);

  // Get userType from multiple sources with priority
  const userType =
    location.state?.userType || urlUserType || searchParams.get("userType");

  const { mutate: register, isLoading } = useRegister();

  const handleSubmit = React.useCallback(
    (data: RegisterFormData) => {
      // Use selectedUserType if available, otherwise fall back to userType
      const finalUserType = selectedUserType || userType;

      register(
        { ...data, role: finalUserType },
        {
          onSuccess: (response) => {
            // Only show modal/navigate after successful API response
            if (response && response.success) {
              if (finalUserType === "educator") {
                // Store registration data for later use
                setRegistrationData(data);
                // Show educator-specific modal first
                setShowEducatorModal(true);
              } else {
                // Only show modal on successful registration for non-educators
                setShowModal(true);
              }
            }
          },
          onError: (error) => {
            console.error("Registration failed:", error);
            // Handle error state here if needed
            // You could show an error modal or toast notification
          },
        }
      );
    },
    [register, selectedUserType, userType]
  );

  const handleUserTypeSelect = React.useCallback((userType: string) => {
    setSelectedUserType(userType);
    // Automatically show registration form after user type selection
    setTimeout(() => {
      setShowRegistrationForm(true);
    }, 300); // Small delay to show selection feedback
  }, []);

  const handleBackToUserType = React.useCallback(() => {
    setShowRegistrationForm(false);
    setSelectedUserType(null);
  }, []);

  const handleSuccessModalClose = () => {
    setShowModal(false);
    // Navigate to login or dashboard
    navigate("/login");
  };

  const handleEducatorModalClose = () => {
    setShowEducatorModal(false);
    // Navigate to OTP verification screen with registration data
    if (registrationData) {
      const finalUserType = selectedUserType || userType;
      navigate("/otp-verification", {
        state: {
          phone: registrationData.phone,
          email: registrationData.email,
          userType: finalUserType,
          registrationData: registrationData,
        },
      });
    }
  };

  // If userType is provided via URL/params, skip user type selection
  React.useEffect(() => {
    if (userType && !showRegistrationForm) {
      setSelectedUserType(userType);
      setShowRegistrationForm(true);
    }
  }, [userType, showRegistrationForm]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Side - Registration Form */}
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

        {/* Registration Form */}
        <Box sx={{ width: "100%", maxWidth: 450, mx: "auto" }}>
          {showRegistrationForm && selectedUserType ? (
            <RegisterForm
              userType={selectedUserType}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onBack={handleBackToUserType}
              selectedUserType={selectedUserType}
            />
          ) : (
            <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
          )}
        </Box>
      </Box>

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />

      {/* Success Modal for non-educator users */}
      <Modal
        open={showModal}
        onClose={handleSuccessModalClose}
        icon={<Email sx={{ color: "green", fontSize: "70px" }} />}
        title="Account Created Successfully!"
        description="Check your email to verify your account and set up your profile."
        buttonText="Set Up My Profile"
      />

      {/* Educator Modal for verification steps */}
      <Modal
        open={showEducatorModal}
        onClose={handleEducatorModalClose}
        icon={<WhatsApp sx={{ color: "green", fontSize: "70px" }} />}
        title="Account Registered Successfully!"
        description="A verification email has been sent to your email address. Please verify your email and then enter the OTP sent to your WhatsApp number to complete the registration process."
        buttonText="Enter WhatsApp OTP"
      />
    </Box>
  );
};
