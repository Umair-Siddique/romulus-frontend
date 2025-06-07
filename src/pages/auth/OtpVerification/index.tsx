import React, { useState, useRef } from "react";
import { Box, Typography, TextField, Button, Paper, Link } from "@mui/material";
import { CheckCircle, ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

import Logo from "../../../assets/images/logo.png";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import { AuthBackground } from "../../../components/auth";
import { Modal } from "../../../components";

interface LocationState {
  phone?: string;
  email?: string;
}

interface OTPVerificationPageProps {
  // Props for forgot password flow
  email?: string;
  onVerificationSuccess?: (otp: string) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({
  email: propEmail,
  onVerificationSuccess,
  onBack,
  isLoading: propIsLoading,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get data from registration or props
  const { phone, email: locationEmail } =
    (location.state as LocationState) || {};

  // Determine the contact method and value
  const contactEmail = propEmail || locationEmail;
  const contactPhone = phone;
  const isEmailVerification = !!contactEmail;
  const contactValue = contactEmail || contactPhone;

  // Use prop loading state if provided, otherwise use local state
  const currentIsLoading =
    propIsLoading !== undefined ? propIsLoading : isLoading;

  const handleOTPChange = (index: number, value: string): void => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent): void => {
    const input = e.target as HTMLInputElement;
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !input.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) return;

    // If this is used in forgot password flow, call the provided callback
    if (onVerificationSuccess) {
      onVerificationSuccess(otpString);
      return;
    }

    // Original registration flow
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowModal(true);
    } catch (error) {
      console.error("OTP verification failed:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = (): void => {
    setShowModal(false);
    // Navigate to login or dashboard
    navigate("/login");
  };

  const handleResendOTP = (): void => {
    console.log("Resending OTP to:", contactValue);
    // Implement resend OTP logic
  };

  const handleBack = (): void => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Redirect if no contact method is provided
  if (!contactValue) {
    if (!onBack) {
      navigate("/register");
    }
    return null;
  }

  // Determine the verification method text
  const getVerificationText = () => {
    if (isEmailVerification) {
      return {
        title: "Verify Your Email",
        description: (
          <>
            Enter the 6-digit code sent to your email{" "}
            <strong>{contactEmail}</strong> to verify your account.
          </>
        ),
      };
    } else {
      return {
        title: "Verify Your Phone",
        description: (
          <>
            Enter the 6-digit code sent to your WhatsApp{" "}
            <strong>{contactPhone}</strong> to verify your number.
          </>
        ),
      };
    }
  };

  const { title, description } = getVerificationText();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Side - OTP Form */}
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

        {/* OTP Form */}
        <Box sx={{ width: "100%", maxWidth: 450, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: "1px solid #e0e0e0",
              borderRadius: 3,
            }}
          >
            {/* Back Button - only show if onBack is provided */}
            {onBack && (
              <Box sx={{ mb: 2 }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={handleBack}
                  sx={{
                    color: "#666",
                    textTransform: "none",
                    fontFamily: "inter, sans-serif",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#A1B7AF",
                    },
                  }}
                >
                  Back
                </Button>
              </Box>
            )}

            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 2,
                fontWeight: 700,
                color: "#333",
                fontFamily: "inter, sans-serif",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "#666",
                fontFamily: "inter, sans-serif",
              }}
            >
              {description}
            </Typography>

            <form onSubmit={handleOTPSubmit}>
              {/* OTP Input Boxes */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333",
                      },
                    }}
                    sx={{
                      width: 50,
                      height: 50,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f5f5f5",
                        height: "100%",
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#A1B7AF",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#A1B7AF",
                          borderWidth: 2,
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontFamily: "inter, sans-serif",
                    mb: 3,
                  }}
                >
                  Didn't receive the code?{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={handleResendOTP}
                    sx={{
                      color: "#A1B7AF",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Click to resend
                  </Link>
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={currentIsLoading || otp.join("").length !== 6}
                  sx={{
                    py: 1.5,
                    backgroundColor: "#A1B7AF",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "none",
                    borderRadius: 2,
                    mb: 3,
                    fontFamily: "inter, sans-serif",
                    "&:hover": {
                      backgroundColor: "#A1B7AF",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                    },
                  }}
                >
                  {currentIsLoading ? "Verifying..." : "Verify"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />

      {/* Success Modal - only show for original registration flow */}
      {!onVerificationSuccess && (
        <Modal
          open={showModal}
          onClose={handleModalClose}
          icon={<CheckCircle sx={{ color: "green", fontSize: "70px" }} />}
          title="Account Created Successfully!"
          description="You're one step closer to starting your journey with us. Now, let's complete your profile and upload your identity documents to get started."
          buttonText="Set Up My Profile"
        />
      )}
    </Box>
  );
};
