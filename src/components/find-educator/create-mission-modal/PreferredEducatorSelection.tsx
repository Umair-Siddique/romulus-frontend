import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormDataProps } from "#types";

interface PreferredEducatorSelectionProps {
  control: Control<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  preferredEducators: any[];
}

export const PreferredEducatorSelection = ({
  errors,
  preferredEducators,
  control,
}: PreferredEducatorSelectionProps) => {
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
        Éducateur préféré
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
        <Controller
          name="preferredEducator"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              displayEmpty
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Typography color="text.disabled">
                      Sélectionnez l'éducateur préféré
                    </Typography>
                  );
                }
                const selectedEducator = preferredEducators.find(
                  (ed) => ed.id === selected
                );
                return selectedEducator?.name || selected;
              }}
            >
              {preferredEducators?.map((preferredEducator: any) => (
                <MenuItem
                  key={preferredEducator.id}
                  value={preferredEducator.id}
                >
                  {preferredEducator.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
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
