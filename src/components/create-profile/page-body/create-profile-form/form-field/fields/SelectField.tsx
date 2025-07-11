import { useTheme, Theme } from "@mui/material/styles";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import { FormControl, Typography, Select, MenuItem } from "@mui/material";

import { SelectFieldProps } from "#types";

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) => {
  const theme = useTheme<Theme>();

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Typography
        variant="body1"
        sx={{
          mb: theme.spacing(1),
          fontWeight: theme.typography.h3.fontWeight,
          color: theme.palette.text.primary,
        }}
      >
        {label} {required && "*"}
      </Typography>
      <Select
        value={value || ""}
        onChange={handleChange}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light,
            borderWidth: 2,
          },
          "& .MuiSelect-select": {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(0.5),
            color: theme.palette.text.primary,
          },
          "& .MuiSelect-icon": {
            color: theme.palette.text.secondary,
          },
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
