import { Info, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type TextInputFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  validationRules?: any;
  register: any;
  errors: Record<string, any>;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  validationRules,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldError = errors[name];
  const hasError = !!fieldError;

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
