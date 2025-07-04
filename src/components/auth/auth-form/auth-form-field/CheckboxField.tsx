import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { CheckboxFieldProps } from "#types";

export const CheckboxField = ({
  label,
  name,
  validationRules,
  register,
  errors,
}: CheckboxFieldProps) => {
  const theme = useTheme<Theme>();
  const fieldError = errors[name];
  const hasError = !!fieldError;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...register(name, validationRules)}
            sx={{
              color: hasError
                ? theme.palette.error.main
                : theme.palette.text.primary,
              "&.Mui-checked": { color: theme.palette.primary.main }, // Changed to primary for better UX
            }}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary, // Using theme text primary instead of hardcoded #333
              fontWeight: 500,
              fontSize: "0.875rem", // 14px equivalent using rem (14/16 = 0.875)
              fontFamily: theme.typography.body2.fontFamily,
            }}
          >
            {label}
          </Typography>
        }
        sx={{
          width: "75%",
          mb: hasError ? theme.spacing(1) : theme.spacing(2),
        }}
      />
      {hasError && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.error.main, // Using theme error color instead of hardcoded #d32f2f
            ml: theme.spacing(4),
            mb: theme.spacing(2),
            display: "block",
            fontSize: "0.75rem", // 12px equivalent using rem (12/16 = 0.75)
            fontFamily: theme.typography.caption.fontFamily,
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </>
  );
};
