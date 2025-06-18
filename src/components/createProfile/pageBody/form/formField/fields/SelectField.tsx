import React from "react";
import { FormControl, Typography, Select, MenuItem } from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";
import { selectFocusStyles, colors } from "../styles";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        {label} {required && "*"}
      </Typography>
      <Select
        value={value || ""}
        onChange={handleChange}
        displayEmpty
        IconComponent={ArrowDownIcon}
        sx={{
          ...selectFocusStyles,
          "& .MuiSelect-icon": {
            color: colors.textSecondary,
          },
          color: colors.text,
        }}
      >
        <MenuItem value="" disabled>
          Select {label.toLowerCase()}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
