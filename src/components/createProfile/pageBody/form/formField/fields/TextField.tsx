import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { inputFocusStyles, colors } from "../styles";

interface TextFieldComponentProps {
  fieldName: string;
  label: string;
  type: "text" | "tel" | "email";
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
}

export const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  fieldName,
  label,
  type,
  maxLength,
  value,
  onChange,
  required = false,
  placeholder,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const isMultiline = fieldName === "bio" || fieldName === "fullAddress";
  const rows = fieldName === "bio" ? 4 : fieldName === "fullAddress" ? 2 : 1;

  const getPlaceholder = () => {
    if (placeholder) return placeholder;

    switch (fieldName) {
      case "bio":
        return "Tell us about yourself, your experience, and what makes you unique...";
      case "fullAddress":
        return "Enter your complete address";
      default:
        return `Enter your ${label.toLowerCase()}`;
    }
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        {label} {required && "*"} {!required && "(Optional)"}
      </Typography>
      <TextField
        fullWidth
        type={type}
        value={value || ""}
        name={fieldName}
        inputProps={{
          maxLength: maxLength,
        }}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        multiline={isMultiline}
        rows={isMultiline ? rows : undefined}
        sx={{
          ...inputFocusStyles,
          "& .MuiInputBase-input": {
            color: colors.text,
          },
          "& .MuiInputBase-input::placeholder": {
            color: colors.textSecondary,
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};
