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
} from "@mui/material";
import React, { useState } from "react";
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
  const isPasswordField = type === "password";
  const isPhoneField = type === "tel";
  const isCheckboxField = type === "checkbox";
  const isRadioField = type === "radio";

  const handleUserTypeSelection = (newValue: string) => {
    setValue(newValue);
    setUserRole(newValue);
    setTimeout(() => {
      setFormStep(2);
    }, 1000);
  };

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
  } else if (isRadioField && options) {
    return (
      <>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
          value={value} // For controlled components
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
        type={isPasswordField && showPassword ? "text" : type}
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
            : isPhoneField
            ? {
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
                        arrow: {
                          sx: {
                            color: "#333",
                          },
                        },
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
              }
            : undefined
        }
      />
    </Box>
  );
};

export default FormField;
