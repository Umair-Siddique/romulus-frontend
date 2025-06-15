import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "file" | "select" | "date" | "tel" | "number" | "email";
  required: boolean;
  options?: string[];
}

export interface FormData {
  [key: string]: any;
}

interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const handleChange = (event: any) => {
    const newValue =
      field.type === "file" ? event.target.files?.[0] : event.target.value;
    onChange(field.name, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case "select":
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value || ""}
              onChange={handleChange}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "file":
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {field.label} {field.required && "*"}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ textAlign: "left", justifyContent: "flex-start" }}
            >
              {value ? value.name || "File selected" : "Choose file"}
              <input
                type="file"
                hidden
                onChange={handleChange}
                required={field.required}
              />
            </Button>
          </Box>
        );

      case "date":
        return (
          <TextField
            fullWidth
            type="date"
            label={field.label}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
            InputLabelProps={{ shrink: true }}
          />
        );

      case "number":
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
          />
        );

      case "tel":
        return (
          <TextField
            fullWidth
            type="tel"
            label={field.label}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
          />
        );

      case "email":
        return (
          <TextField
            fullWidth
            type="email"
            label={field.label}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
          />
        );

      default:
        return (
          <TextField
            fullWidth
            type="text"
            label={field.label}
            value={value || ""}
            onChange={handleChange}
            required={field.required}
            multiline={field.name === "bio" || field.name === "fullAddress"}
            rows={
              field.name === "bio" ? 3 : field.name === "fullAddress" ? 2 : 1
            }
          />
        );
    }
  };

  return <Box sx={{ mb: 2 }}>{renderField()}</Box>;
};
