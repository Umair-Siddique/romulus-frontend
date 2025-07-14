import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

import { NumberFieldProps } from "#types";

export const NumberField = ({
  fieldName,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  startAdornment,
  endAdornment,
}: NumberFieldProps) => {
  const theme = useTheme<Theme>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Allow only up to 16 characters
    if (newValue.length <= 16) {
      onChange(newValue);
    }
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
        sx={{
          mb: theme.spacing(1),
          fontWeight: theme.typography.h3.fontWeight,
          color: theme.palette.text.primary,
        }}
      >
        {fieldProps.label} {required && "*"}
      </Typography>
      <TextField
        fullWidth
        type="number"
        value={value || ""}
        onChange={handleChange}
        placeholder={fieldProps.placeholder}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        InputProps={{
          ...(fieldProps.startAdornment && {
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {fieldProps.startAdornment}
                </Typography>
              </InputAdornment>
            ),
          }),
          ...(fieldProps.endAdornment && {
            endAdornment: (
              <InputAdornment position="end">
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {fieldProps.endAdornment}
                </Typography>
              </InputAdornment>
            ),
          }),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: theme.spacing(0.5),
            backgroundColor: theme.palette.background.paper,
            "& fieldset": {
              borderColor: theme.palette.divider,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.light,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.light,
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
          },
          "& .MuiInputBase-input::placeholder": {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};
