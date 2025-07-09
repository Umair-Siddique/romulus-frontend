import { TextField, Typography, Box, useTheme } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormDataProps } from "#types";

interface MissionTitleFieldProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
}

export const MissionTitleField = ({
  register,
  errors,
}: MissionTitleFieldProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        Mission Title *
      </Typography>
      <TextField
        placeholder="Enter title"
        fullWidth
        error={!!errors.title}
        helperText={
          typeof errors.title?.message === "string"
            ? errors.title.message
            : undefined
        }
        {...register("title", {
          required: "Mission title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
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
        variant="outlined"
      />
    </Box>
  );
};
