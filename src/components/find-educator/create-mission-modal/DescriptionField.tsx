import { Box, Typography, TextField, useTheme } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormDataProps } from "#types";

interface DescriptionFieldProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
}

export const DescriptionField = ({
  register,
  errors,
}: DescriptionFieldProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          mb: theme.spacing(1),
          fontWeight: theme.typography.h3.fontWeight,
          color: theme.palette.text.primary,
        }}
      >
        Description *
      </Typography>
      <TextField
        placeholder="Entrez une description détaillée de la mission"
        fullWidth
        multiline
        rows={4}
        error={!!errors.description}
        helperText={
          typeof errors.description?.message === "string"
            ? errors.description.message
            : undefined
        }
        {...register("description", {
          required: "La description est requise",
          minLength: {
            value: 10,
            message: "La description doit comporter au moins 10 caractères",
          },
        })}
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
