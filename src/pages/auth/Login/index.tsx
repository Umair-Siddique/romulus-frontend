import React from "react";
import { Box } from "@mui/material";
import { useLogin } from "@refinedev/core";

import AuthBg from "../../../assets/images/auth-bg.jpg";
import Logo from "../../../assets/images/logo.png";
import { LoginFormData } from "../../../types/auth";
import { AuthBackground, LoginForm } from "../../../components/auth";

export const LoginPage = () => {
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = React.useCallback(
    (data: LoginFormData) => {
      login({ ...data });
      console.log({ ...data });
    },
    [login]
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
      {/* Left Side - User Type Selection or Login Form */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, md: 6 },
          py: 4,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Logo - Fixed to top */}
        <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
          <Box component={"img"} src={Logo} alt="Logo" />
        </Box>

        {/* Content Container - Centered vertically in remaining space */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
        </Box>
      </Box>

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
