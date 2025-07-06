import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";

import { DateFieldProps } from "#types";

export const DateField = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "Select date",
}: DateFieldProps) => {
  const theme = useTheme<Theme>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
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
              paddingRight: theme.spacing(5), // 40px equivalent
            },
            "& input[type='date']::-webkit-calendar-picker-indicator": {
              opacity: 0,
              position: "absolute",
              right: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            },
          }}
        />
        <CalendarIcon
          sx={{
            position: "absolute",
            right: theme.spacing(1.5), // 12px equivalent
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.palette.text.secondary,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};
