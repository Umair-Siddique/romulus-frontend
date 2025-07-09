import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormDataProps } from "#types";

interface PreferredEducatorSelectionProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  preferredEducators: any[];
}

export const PreferredEducatorSelection = ({
  register,
  errors,
  preferredEducators,
}: PreferredEducatorSelectionProps) => {
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
        Preferred Educator
      </Typography>
      <FormControl
        fullWidth
        error={!!errors.preferredEducator}
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
      >
        <Select
          displayEmpty
          {...register("preferredEducator")}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography color="text.disabled">
                  Select preferred educator
                </Typography>
              );
            }
            return typeof selected === "string" ? selected : String(selected);
          }}
        >
          {preferredEducators?.map((preferredEducator: any) => (
            <MenuItem
              key={preferredEducator.name}
              value={preferredEducator.name}
            >
              {preferredEducator.name}
            </MenuItem>
          ))}
        </Select>
        {errors.preferredEducator &&
          typeof errors.preferredEducator.message === "string" && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {errors.preferredEducator.message}
            </Typography>
          )}
      </FormControl>
    </Box>
  );
};
