import React from "react";
import {
  Typography,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Link,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff, Info } from "@mui/icons-material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "../../../interface/auth";
import { validationRules } from "../../../constants/validation";

interface RegisterFormFieldsProps {
  control: Control<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  userType: string;
  password: string;
}

export const RegisterFormFields = React.memo(
  ({ control, errors, userType, password }: RegisterFormFieldsProps) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleTogglePassword = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleToggleConfirmPassword = React.useCallback(() => {
      setShowConfirmPassword((prev) => !prev);
    }, []);

    // Field component for reusability
    const FormField = ({
      name,
      label,
      placeholder,
      type = "text",
      rules = validationRules.required,
      select = false,
      options = [],
    }: {
      name: string;
      label: string;
      placeholder: string;
      type?: string;
      rules?: any;
      select?: boolean;
      options?: string[];
    }) => (
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
        <Controller
          name={name as keyof RegisterFormData}
          control={control}
          rules={rules}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder={placeholder}
              type={type}
              select={select}
              error={!!(errors as any)[name]}
              sx={{
                mb: (errors as any)[name] ? 1 : 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: (errors as any)[name] ? "#d32f2f" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: (errors as any)[name] ? "#d32f2f" : "#A1B7AF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: (errors as any)[name] ? "#d32f2f" : "#A1B7AF",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
                fontFamily: "inter, sans-serif",
                fontSize: "14px",
              }}
            >
              {select &&
                options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
        {(errors as any)[name] && (
          <FormHelperText error sx={{ mb: 2, ml: 1 }}>
            {(errors as any)[name].message}
          </FormHelperText>
        )}
      </>
    );

    return (
      <>
        <FormField
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
        />

        <FormField
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
        />

        <FormField
          name="email"
          label="Email"
          placeholder="Enter your email address"
          type="email"
          rules={validationRules.email}
        />

        {/* User Type Specific Fields */}
        {userType === "educator" && (
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
              Phone Number{" "}
              <span style={{ color: "#666", fontWeight: 400 }}>
                (with country code)
              </span>
            </Typography>
            <Controller
              name="phone"
              control={control}
              rules={validationRules.phone}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="e.g., +923001234567"
                  type="text"
                  error={!!errors.phone}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter your active WhatsApp number with country code (e.g., +92 300 1234567). This will be used to receive mission alerts and updates."
                          placement="top"
                          arrow
                          sx={{
                            "& .MuiTooltip-tooltip": {
                              backgroundColor: "#333",
                              color: "#fff",
                              fontSize: "12px",
                              fontFamily: "inter, sans-serif",
                              maxWidth: 250,
                              textAlign: "center",
                            },
                            "& .MuiTooltip-arrow": {
                              color: "#333",
                            },
                          }}
                        >
                          <IconButton edge="end" size="small">
                            <Info
                              sx={{
                                fontSize: 20,
                                color: "#999",
                                "&:hover": {
                                  color: "#777",
                                },
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: errors.phone ? 1 : 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 4,
                      backgroundColor: "#fafafa",
                      "& fieldset": {
                        borderColor: errors.phone ? "#d32f2f" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.phone ? "#d32f2f" : "#A1B7AF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.phone ? "#d32f2f" : "#A1B7AF",
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
            {/* Format helper text - always show */}
            {!errors.phone && (
              <FormHelperText
                sx={{
                  mb: 2,
                  ml: 1,
                  color: "#666",
                  fontSize: "12px",
                  fontFamily: "inter, sans-serif",
                }}
              >
                Format: +[country code] [number] (e.g., +923001234567)
              </FormHelperText>
            )}
            {/* Error message */}
            {errors.phone && (
              <FormHelperText error sx={{ mb: 2, ml: 1, fontSize: "12px" }}>
                {errors.phone.message}
              </FormHelperText>
            )}
          </>
        )}

        {/* Password Fields */}
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
                      onClick={handleTogglePassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: errors.password ? 1 : 2,
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
              }}
            />
          )}
        />
        {errors.password && (
          <FormHelperText error sx={{ mb: 2, ml: 1 }}>
            {errors.password.message}
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
          Confirm Password
        </Typography>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            ...validationRules.confirmPassword,
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: errors.confirmPassword ? 1 : 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "#fafafa",
                  "& fieldset": {
                    borderColor: errors.confirmPassword ? "#d32f2f" : "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.confirmPassword ? "#d32f2f" : "#A1B7AF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.confirmPassword ? "#d32f2f" : "#A1B7AF",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
              }}
            />
          )}
        />
        {errors.confirmPassword && (
          <FormHelperText error sx={{ mb: 2, ml: 1 }}>
            {errors.confirmPassword.message}
          </FormHelperText>
        )}

        {/* Terms and Conditions */}
        <Box sx={{ mb: 3 }}>
          <Controller
            name="agreeToTerms"
            control={control}
            rules={{
              required: "You must agree to the terms and conditions",
            }}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{
                      color: "#A1B7AF",
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
                      fontSize: "14px",
                      fontFamily: "inter, sans-serif",
                      color: "#666",
                    }}
                  >
                    I agree to the{" "}
                    <Link
                      href="#"
                      sx={{
                        color: "#A1B7AF",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      sx={{
                        color: "#A1B7AF",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
            )}
          />
          {errors.agreeToTerms && (
            <FormHelperText error sx={{ ml: 1 }}>
              {errors.agreeToTerms.message}
            </FormHelperText>
          )}
        </Box>
      </>
    );
  }
);

RegisterFormFields.displayName = "RegisterFormFields";
