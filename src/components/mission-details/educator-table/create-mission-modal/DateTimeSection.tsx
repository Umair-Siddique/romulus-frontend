import { Box, Typography, Stack, useTheme } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, FieldErrors, Control } from "react-hook-form";
import { FormDataProps } from "#types";
import dayjs, { Dayjs } from "dayjs";

interface DateTimeSectionProps {
  errors: FieldErrors<FormDataProps>;
  watchedValues: any;
  control: Control<FormDataProps>;
}

export const DateTimeSection = ({
  errors,
  watchedValues,
  control,
}: DateTimeSectionProps) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Date Selection */}
      <Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: theme.typography.h3.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              Date *
            </Typography>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date: Dayjs | null) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "Select date",
                      error: !!errors.startDate,
                      helperText:
                        typeof errors.startDate?.message === "string"
                          ? errors.startDate.message
                          : undefined,
                    },
                  }}
                />
              )}
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
                fontWeight: theme.typography.h3.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              Start Time *
            </Typography>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                  onChange={(time: Dayjs | null) => {
                    field.onChange(time ? time.format("HH:mm") : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "Select start time",
                      error: !!errors.startTime,
                      helperText:
                        typeof errors.startTime?.message === "string"
                          ? errors.startTime.message
                          : undefined,
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: theme.typography.h3.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              End Time *
            </Typography>
            <Controller
              name="endTime"
              control={control}
              rules={{
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
              }}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  value={field.value ? dayjs(field.value, "HH:mm") : null}
                  onChange={(time: Dayjs | null) => {
                    field.onChange(time ? time.format("HH:mm") : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "Select end time",
                      error: !!errors.endTime,
                      helperText:
                        typeof errors.endTime?.message === "string"
                          ? errors.endTime.message
                          : undefined,
                    },
                  }}
                />
              )}
            />
          </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
