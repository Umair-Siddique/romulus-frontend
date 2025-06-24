import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

type CheckboxFieldProps = {
  label: string;
  name: string;
  validationRules?: any;
  register: any;
  errors: Record<string, any>;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  validationRules,
  register,
  errors,
}) => {
  const fieldError = errors[name];
  const hasError = !!fieldError;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...register(name, validationRules)}
            sx={{
              color: hasError ? "#d32f2f" : "#A1B7AF",
              "&.Mui-checked": { color: "#A1B7AF" },
            }}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              color: "#333",
              fontWeight: 500,
              fontSize: "14px",
              fontFamily: "inter, sans-serif",
            }}
          >
            {label}
          </Typography>
        }
        sx={{ width: "75%", mb: hasError ? 1 : 2 }}
      />
      {hasError && (
        <Typography
          variant="caption"
          sx={{
            color: "#d32f2f",
            ml: 4,
            mb: 2,
            display: "block",
            fontSize: "12px",
            fontFamily: "inter, sans-serif",
          }}
        >
          {fieldError?.message}
        </Typography>
      )}
    </>
  );
};
