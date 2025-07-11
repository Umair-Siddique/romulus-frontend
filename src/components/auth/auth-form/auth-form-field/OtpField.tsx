import { useRef, useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";

import { OTPFieldProps } from "#types";

export const OTPField = ({
  label,
  name,
  register,
  errors,
  setVerificationCode,
}: OTPFieldProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fieldError = errors[name];
  const hasError = !!fieldError;

  const theme = useTheme<Theme>();

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
          mb: theme.spacing(2),
          color: theme.palette.text.primary, // Using theme text primary instead of hardcoded #333
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: "0.875rem", // 14px equivalent using rem (14/16 = 0.875)
          fontFamily: theme.typography.body2.fontFamily,
          alignSelf: "flex-start",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(1),
          justifyContent: "center",
          mb: hasError ? theme.spacing(1) : theme.spacing(3),
          width: "100%",
          maxWidth: theme.spacing(45), // 360px equivalent using theme spacing (360/8 = 45)
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
                fontSize: "1.25rem", // 20px equivalent using rem (20/16 = 1.25)
                fontWeight: "600",
                color: theme.palette.text.primary, // Using theme text primary instead of hardcoded #333
                fontFamily: theme.typography.body1.fontFamily,
              },
            }}
            sx={{
              width: theme.spacing(6.25), // 50px equivalent using theme spacing (50/8 = 6.25)
              height: theme.spacing(6.25), // 50px equivalent using theme spacing (50/8 = 6.25)
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.spacing(1.5), // 2px equivalent using theme spacing
                backgroundColor: theme.palette.background.default, // Using theme background default instead of hardcoded #fafafa
                height: "100%",
                "& fieldset": {
                  borderColor: hasError
                    ? theme.palette.error.main
                    : theme.palette.divider, // Using theme divider instead of hardcoded #e0e0e0
                },
                "&:hover fieldset": {
                  borderColor: hasError
                    ? theme.palette.error.main
                    : theme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: hasError
                    ? theme.palette.error.main
                    : theme.palette.primary.light,
                  borderWidth: 2,
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: theme.spacing(1.5), // 12px equivalent using theme spacing
              },
            }}
          />
        ))}
      </Box>

      {hasError && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.error.main, // Using theme error color instead of hardcoded #d32f2f
            mt: theme.spacing(0.5),
            mb: theme.spacing(2),
            display: "block",
            fontSize: "0.75rem", // 12px equivalent using rem (12/16 = 0.75)
            fontFamily: theme.typography.caption.fontFamily,
            textAlign: "center",
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </Box>
  );
};
