import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

interface InputFieldProps {
  label: string;
  type?: "text" | "select" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  options = [],
  rows = 4,
  value,
  onChange,
}) => {
  const handleChange = (event: any) => {
    onChange?.(event.target.value);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f8f9fa",
      border: "none",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid #A1B7AF",
      },
    },
    "& .MuiInputBase-input": {
      padding: "16px",
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
      "&::placeholder": {
        color: "#9ca3af",
        opacity: 1,
      },
    },
  };

  const selectStyle = {
    backgroundColor: "#f8f9fa",
    border: "none",
    fontFamily: "Inter, sans-serif",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid #A1B7AF",
    },
    "& .MuiSelect-select": {
      padding: "16px",
      fontSize: "14px",
      fontFamily: "Inter, sans-serif",
      color: value ? "#000" : "#9ca3af",
    },
    "& .MuiSelect-icon": {
      color: "#9ca3af",
    },
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <FormControl fullWidth>
            <Select
              value={value || ""}
              onChange={handleChange}
              displayEmpty
              sx={selectStyle}
            >
              <MenuItem value="" sx={{ color: "#9ca3af" }}>
                {placeholder}
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "date":
        return (
          <TextField
            type="date"
            fullWidth
            placeholder={placeholder}
            value={value || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{
              ...inputStyle,
              "& .MuiInputBase-input": {
                ...inputStyle["& .MuiInputBase-input"],
                color: value ? "#000" : "#9ca3af",
              },
            }}
          />
        );

      case "textarea":
        return (
          <TextField
            multiline
            rows={rows}
            fullWidth
            placeholder={placeholder}
            value={value || ""}
            onChange={handleChange}
            sx={{
              ...inputStyle,
              "& .MuiInputBase-input": {
                padding: "5px",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                "&::placeholder": {
                  color: "#9ca3af",
                  opacity: 1,
                },
              },
            }}
          />
        );

      default:
        return (
          <TextField
            fullWidth
            placeholder={placeholder}
            value={value || ""}
            onChange={handleChange}
            sx={inputStyle}
          />
        );
    }
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          color: "#374151",
          marginBottom: "8px",
          fontSize: "14px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#374151", marginLeft: "2px" }}>*</span>
        )}
      </Typography>
      {renderInput()}
    </Box>
  );
};
