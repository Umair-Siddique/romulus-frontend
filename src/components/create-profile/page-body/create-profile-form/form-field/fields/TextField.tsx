import { Box, Typography, TextField } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { TextFieldComponentProps } from "#types";

export const TextFieldComponent = ({
  fieldName,
  label,
  type,
  maxLength,
  value,
  onChange,
  required = false,
  placeholder,
}: TextFieldComponentProps) => {
  const theme = useTheme<Theme>();

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
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
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
