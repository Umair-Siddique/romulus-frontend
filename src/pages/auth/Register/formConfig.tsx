import { Typography } from "@mui/material";
import TextLink from "#components/TextLink";

export const getFormConfig = (
  formStep: number,
  requestOtpAgain: () => void
) => {
  if (formStep === 1) {
    return {
      title: "Select Your User Type",
      description:
        "Choose your role to proceed with the registration or login process.",
    };
  } else if (formStep === 2) {
    return {
      title: "Create Your Account",
      description: "Fill in your details to sign up.",
      bottomContent: (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: "14px",
            fontFamily: "inter, sans-serif",
          }}
        >
          Already have an account? <TextLink to="/login" label="Login" />
        </Typography>
      ),
      submitLoadingText: "Signing up...",
      submitLabel: "Sign Up",
    };
  }

  return {
    title: "Check your WhatsApp number",
    description:
      "Enter the 6-digit code sent to your WhatsApp (+92 3XXXXXXXXX) to verify your number.",
    bottomContent: (
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{
          mb: 2,
          fontSize: "14px",
          fontFamily: "inter, sans-serif",
        }}
      >
        Didn't receive a code?{" "}
        <Typography
          sx={{
            color: "#A1B7AF",
            textDecoration: "none",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
            background: "none",
            padding: 0,
            fontFamily: "montserrat, sans-serif",
            fontSize: "14px",
          }}
          onClick={requestOtpAgain}
        >
          Request again.
        </Typography>
      </Typography>
    ),
  };
};
