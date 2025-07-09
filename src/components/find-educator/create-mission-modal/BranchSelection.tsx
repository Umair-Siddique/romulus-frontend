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

interface BranchSelectionProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  branches: Array<{ name: string; coordinates: any }>;
}

export const BranchSelection = ({
  register,
  errors,
  branches,
}: BranchSelectionProps) => {
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
        Branch *
      </Typography>
      <FormControl
        fullWidth
        error={!!errors.branch}
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
          {...register("branch", {
            required: "Branch selection is required",
          })}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography color="text.disabled">Select branch</Typography>
              );
            }
            return typeof selected === "string" ? selected : String(selected);
          }}
        >
          {branches?.map((branch: any) => (
            <MenuItem key={branch.name} value={branch.name}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
        {errors.branch && typeof errors.branch.message === "string" && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {errors.branch.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};
