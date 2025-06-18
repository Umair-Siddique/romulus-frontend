import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import { inputFocusStyles, colors } from "../styles";

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "Select date",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        {label} {required && "*"}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          type="date"
          value={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          sx={{
            ...inputFocusStyles,
            "& .MuiInputBase-input": {
              color: colors.text,
            },
            "& input[type='date']::-webkit-calendar-picker-indicator": {
              opacity: 0,
              position: "absolute",
              right: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            },
            "& input[type='date']": {
              paddingRight: "40px",
            },
          }}
        />
        <CalendarIcon
          sx={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: colors.textSecondary,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};
