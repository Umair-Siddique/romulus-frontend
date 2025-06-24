import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

type OTPFieldProps = {
  label: string;
  name: string;
  register: any;
  errors: Record<string, any>;
  setVerificationCode?: (code: string[]) => void;
};

export const OTPField: React.FC<OTPFieldProps> = ({
  label,
  name,
  register,
  errors,
  setVerificationCode,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fieldError = errors[name];
  const hasError = !!fieldError;

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setVerificationCode?.(newOtp);

      // Update form state
      const otpValue = newOtp.join("");
      register(name).onChange({ target: { value: otpValue, name } });

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#333",
          fontWeight: 500,
          fontSize: "14px",
          fontFamily: "inter, sans-serif",
          alignSelf: "flex-start",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          mb: hasError ? 1 : 3,
          width: "100%",
          maxWidth: 360,
        }}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            error={hasError}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
                color: "#333",
                fontFamily: "inter, sans-serif",
              },
            }}
            sx={{
              width: 50,
              height: 50,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fafafa",
                height: "100%",
                "& fieldset": {
                  borderColor: hasError ? "#d32f2f" : "#e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: hasError ? "#d32f2f" : "#A1B7AF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: hasError ? "#d32f2f" : "#A1B7AF",
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

      {hasError && (
        <Typography
          variant="caption"
          sx={{
            color: "#d32f2f",
            mt: 0.5,
            mb: 2,
            display: "block",
            fontSize: "12px",
            fontFamily: "inter, sans-serif",
            textAlign: "center",
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </Box>
  );
};
