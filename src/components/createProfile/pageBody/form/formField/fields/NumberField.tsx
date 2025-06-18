import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { inputFocusStyles, colors } from "../styles";

interface NumberFieldProps {
  fieldName: string;
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  required?: boolean;
  placeholder?: string;
  startAdornment?: string;
  endAdornment?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  fieldName,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  startAdornment,
  endAdornment,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const getFieldSpecificProps = () => {
    if (fieldName === "hourlyRate") {
      return {
        label: "Your Hourly Rate",
        startAdornment: "€",
        placeholder: placeholder || "Enter your hourly rate",
      };
    }

    return {
      label,
      startAdornment,
      endAdornment,
      placeholder: placeholder || `Enter ${label.toLowerCase()}`,
    };
  };

  const fieldProps = getFieldSpecificProps();

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        {fieldProps.label} {required && "*"}
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={value || ""}
        onChange={handleChange}
        placeholder={fieldProps.placeholder}
        InputProps={{
          ...(fieldProps.startAdornment && {
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: colors.textSecondary }}>
                  {fieldProps.startAdornment}
                </Typography>
              </InputAdornment>
            ),
          }),
          ...(fieldProps.endAdornment && {
            endAdornment: (
              <InputAdornment position="end">
                <Typography sx={{ color: colors.textSecondary }}>
                  {fieldProps.endAdornment}
                </Typography>
              </InputAdornment>
            ),
          }),
        }}
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
