import { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { TextInputFieldProps } from "#types";

export const TextInputField = ({
  label,
  type,
  name,
  placeholder,
  validationRules,
  register,
  errors,
}: TextInputFieldProps) => {
  const theme = useTheme<Theme>();
  const [showPassword, setShowPassword] = useState(false);
  const fieldError = errors[name];
  const hasError = !!fieldError;

  const getInputProps = () => {
    if (type === "password") {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      };
    }

    if (type === "tel") {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              title="Please enter your WhatsApp number with country code. This will be used for important notifications and updates about your tasks and missions."
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: theme.palette.text.primary, // Using theme text primary instead of hardcoded #333
                    color: theme.palette.primary.contrastText, // Using theme contrast text instead of hardcoded white
                    fontSize: "0.75rem", // 12px equivalent using rem (12/16 = 0.75)
                    fontFamily: theme.typography.caption.fontFamily,
                    maxWidth: theme.spacing(37.5), // 300px equivalent using theme spacing (300/8 = 37.5)
                    p: theme.spacing(1.5),
                  },
                },
                arrow: { sx: { color: theme.palette.text.primary } },
              }}
            >
              <IconButton
                edge="end"
                aria-label="phone number information"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.primary.light,
                    backgroundColor: "transparent",
                  },
                }}
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      };
    }

    return undefined;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="body2"
        sx={{
          mb: theme.spacing(1),
          color: theme.palette.text.primary, // Using theme text primary instead of hardcoded #333
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: "0.875rem", // 14px equivalent using rem (14/16 = 0.875)
          fontFamily: theme.typography.body2.fontFamily,
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        type={type === "password" && showPassword ? "text" : type}
        {...register(name, validationRules)}
        error={hasError}
        helperText={hasError ? fieldError?.message : ""}
        sx={{
          width: theme.spacing(56.25), // 450px equivalent using theme spacing (450/8 = 56.25)
          mb: hasError ? theme.spacing(2) : theme.spacing(3),
          "& .MuiOutlinedInput-root": {
            borderRadius: theme.spacing(1.5), // 4px equivalent using theme spacing
            backgroundColor: theme.palette.background.default, // Using theme background default instead of hardcoded #fafafa
            "& fieldset": {
              borderColor: hasError
                ? theme.palette.error.main
                : theme.palette.primary.light,
            },
            "&:hover fieldset": {
              borderColor: hasError
                ? theme.palette.error.main
                : theme.palette.primary.light,
            },
            "&.Mui-focused fieldset": {
              borderColor: hasError
                ? theme.palette.error.main
                : theme.palette.primary.light,
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": { py: theme.spacing(1.5) },
          "& .MuiFormHelperText-root": {
            ml: theme.spacing(1),
            mt: theme.spacing(0.5),
          },
          fontFamily: theme.typography.body1.fontFamily,
          fontSize: "0.875rem", // 14px equivalent using rem (14/16 = 0.875)
        }}
        InputProps={getInputProps()}
      />
    </Box>
  );
};
