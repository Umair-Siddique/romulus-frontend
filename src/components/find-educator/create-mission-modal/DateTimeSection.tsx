import { Box, Typography, TextField, Stack, useTheme } from "@mui/material";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FormDataProps } from "#types";

interface DateTimeSectionProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  watchedValues: any;
}

export const DateTimeSection = ({
  register,
  errors,
  watchedValues,
}: DateTimeSectionProps) => {
  const theme = useTheme();

  const textFieldStyles = {
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
  };

  return (
    <>
      {/* Date Selection */}
      <Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Date *
            </Typography>
            <TextField
              placeholder="Date"
              type="date"
              fullWidth
              error={!!errors.startDate}
              helperText={
                typeof errors.startDate?.message === "string"
                  ? errors.startDate.message
                  : undefined
              }
              {...register("startDate", {
                required: "Start date is required",
              })}
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Box>
        </Stack>
      </Box>

      {/* Time Selection */}
      <Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Start Time *
            </Typography>
            <TextField
              placeholder="Start Time"
              type="time"
              fullWidth
              error={!!errors.startTime}
              helperText={
                typeof errors.startTime?.message === "string"
                  ? errors.startTime.message
                  : undefined
              }
              {...register("startTime", {
                required: "Start time is required",
              })}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              sx={textFieldStyles}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              End Time *
            </Typography>
            <TextField
              placeholder="End Time"
              type="time"
              fullWidth
              error={!!errors.endTime}
              helperText={
                typeof errors.endTime?.message === "string"
                  ? errors.endTime.message
                  : undefined
              }
              {...register("endTime", {
                required: "End time is required",
                validate: (value) => {
                  if (
                    watchedValues.startTime &&
                    value <= watchedValues.startTime
                  ) {
                    return "End time must be after start time.";
                  }
                  return true;
                },
              })}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              sx={textFieldStyles}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
