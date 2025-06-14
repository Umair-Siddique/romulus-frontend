import { Info, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Box,
  Tooltip,
  Paper,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { UserTypeCard } from "../userTypeCard";

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  options?: {
    icon: React.ReactElement;
    title: string;
    description: string;
    value: string;
  }[];
  validationRules?: any;
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  register: any;
  errors: Record<string, any>;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  options,
  validationRules,
  setFormStep = () => {},
  setUserRole = () => {},
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fieldError = errors[name];
  const hasError = !!fieldError;

  const handleUserTypeSelection = (newValue: string) => {
    setValue(newValue);
    setUserRole(newValue);
    setTimeout(() => setFormStep(2), 300);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

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

  // Render checkbox field
  if (type === "checkbox") {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              {...register(name, validationRules)}
              sx={{
                color: hasError ? "#d32f2f" : "#A1B7AF",
                "&.Mui-checked": { color: "#A1B7AF" },
              }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                fontWeight: 500,
                fontSize: "14px",
                fontFamily: "inter, sans-serif",
              }}
            >
              {label}
            </Typography>
          }
          sx={{ width: "75%", mb: hasError ? 1 : 2 }}
        />
        {hasError && (
          <Typography
            variant="caption"
            sx={{
              color: "#d32f2f",
              ml: 4,
              mb: 2,
              display: "block",
              fontSize: "12px",
              fontFamily: "inter, sans-serif",
            }}
          >
            {fieldError?.message}
          </Typography>
        )}
      </>
    );
  }

  // Render radio field
  if (type === "radio" && options) {
    return (
      <>
        <RadioGroup
          value={value}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            mb: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {options.map((option) => (
            <UserTypeCard
              key={option.value}
              icon={option.icon}
              title={option.title}
              description={option.description}
              value={option.value}
              isSelected={value === option.value}
              onSelect={handleUserTypeSelection}
            />
          ))}
        </RadioGroup>
        {hasError && (
          <Typography
            variant="caption"
            sx={{
              color: "#d32f2f",
              ml: 1,
              mt: 0.5,
              display: "block",
              fontSize: "12px",
              fontFamily: "inter, sans-serif",
            }}
          >
            {fieldError?.message}
          </Typography>
        )}
      </>
    );
  }

  if (name === "verificationCode") {
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

        {/* OTP Input Boxes */}
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
  }

  // Get input props based on field type
  const getInputProps = () => {
    if (type === "password") {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      };
    }

    if (type === "tel") {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              title="Please enter your WhatsApp number with country code. This will be used for important notifications and updates about your tasks and missions."
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#333",
                    color: "white",
                    fontSize: "12px",
                    fontFamily: "inter, sans-serif",
                    maxWidth: 300,
                    p: 1.5,
                  },
                },
                arrow: { sx: { color: "#333" } },
              }}
            >
              <IconButton
                edge="end"
                aria-label="phone number information"
                sx={{
                  color: "#666",
                  "&:hover": {
                    color: "#A1B7AF",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Info fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      };
    }

    return undefined;
  };

  // Render text input field
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          color: "#333",
          fontWeight: 500,
          fontSize: "14px",
          fontFamily: "inter, sans-serif",
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        type={type === "password" && showPassword ? "text" : type}
        {...register(name, validationRules)}
        error={hasError}
        helperText={hasError ? fieldError?.message : ""}
        sx={{
          width: 450,
          mb: hasError ? 2 : 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: "#fafafa",
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
          "& .MuiInputBase-input": { py: 1.5 },
          "& .MuiFormHelperText-root": { ml: 1, mt: 0.5 },
          fontFamily: "inter, sans-serif",
          fontSize: "14px",
        }}
        InputProps={getInputProps()}
      />
    </Box>
  );
};

export default FormField;
