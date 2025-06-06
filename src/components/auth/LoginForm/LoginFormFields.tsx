import React from "react";
import {
  TextField,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { LoginFormData } from "../../../types/auth";
import { validationRules } from "../../../constants/validation";

interface LoginFormFieldsProps {
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const LoginFormFields = React.memo(
  ({
    control,
    errors,
    showPassword,
    onTogglePassword,
  }: LoginFormFieldsProps) => {
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
          Email
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={validationRules.email}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Enter your email address"
              type="email"
              error={!!errors.email}
              sx={{
                mb: errors.email ? 1 : 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: errors.email ? "#d32f2f" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.email ? "#d32f2f" : "#A1B7AF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.email ? "#d32f2f" : "#A1B7AF",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
                fontFamily: "inter, sans-serif",
                fontSize: "14px",
              }}
            />
          )}
        />
        {errors.email && (
          <FormHelperText error sx={{ mb: 2, ml: 1 }}>
            {errors.email.message}
          </FormHelperText>
        )}

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
          Password
        </Typography>
        <Controller
          name="password"
          control={control}
          rules={validationRules.password}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onTogglePassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: errors.password ? 1 : 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: errors.password ? "#d32f2f" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.password ? "#d32f2f" : "#A1B7AF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.password ? "#d32f2f" : "#A1B7AF",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
                fontFamily: "inter, sans-serif",
                fontSize: "14px",
              }}
            />
          )}
        />
        {errors.password && (
          <FormHelperText error sx={{ mb: 2, ml: 1 }}>
            {errors.password.message}
          </FormHelperText>
        )}
      </>
    );
  }
);

LoginFormFields.displayName = "LoginFormFields";
