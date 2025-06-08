import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  register: any;
  errors: Record<string, any>;
  placeholder?: string;
  validationRules?: any;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  register,
  errors,
  placeholder,
  validationRules,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const isCheckboxField = type === "checkbox";

  const fieldError = errors[name];
  const hasError = !!fieldError;

  if (isCheckboxField) {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              {...register(name, validationRules)}
              sx={{
                color: hasError ? "#d32f2f" : "#A1B7AF",
                "&.Mui-checked": {
                  color: "#A1B7AF",
                },
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
          sx={{ mb: hasError ? 1 : 2 }}
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

  return (
    <>
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
        type={isPasswordField && showPassword ? "text" : type}
        {...register(name, validationRules)}
        error={hasError}
        helperText={hasError ? fieldError?.message : ""}
        sx={{
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
          "& .MuiInputBase-input": {
            py: 1.5,
          },
          "& .MuiFormHelperText-root": {
            ml: 1,
            mt: 0.5,
          },
          fontFamily: "inter, sans-serif",
          fontSize: "14px",
        }}
        InputProps={
          isPasswordField
            ? {
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
              }
            : undefined
        }
      />
    </>
  );
};

export default FormField;