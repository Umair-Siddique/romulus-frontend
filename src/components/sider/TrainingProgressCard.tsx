import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from "@mui/icons-material";

export const TrainingProgressCard = () => {
  const theme = useTheme();

  const progress = 50;
  const totalVideos = 4;
  const completedVideos = 2;

  return (
    <Card
      sx={{
        width: "100%",
        background: "linear-gradient(to right, #0754D8, #6FB1FC)",
        color: "white",
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: 340,
        mx: "auto", // center if used in flex or grid layout
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.2}>
          {/* Title */}
          <Typography variant="subtitle1" sx={{ theme.typography.h2.fontWeight }}>
            Training Progress
          </Typography>

          {/* Subtitle */}
          <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
            Complete training to unlock missions.
          </Typography>

          {/* Progress Stats */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption">{progress}%</Typography>
            <Typography variant="caption">
              {completedVideos} of {totalVideos} videos
            </Typography>
          </Stack>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFB800",
              },
            }}
          />

          {/* Video Completion Status */}
          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <CheckIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              {completedVideos} of {totalVideos} videos completed
            </Typography>
          </Stack>

          {/* Quiz Status */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <UncheckedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">📝Quiz not attempted</Typography>
          </Stack>

          {/* Resume Button */}
          <Button
            variant="contained"
            sx={{
              mt: 1.5,
              backgroundColor: "white",
              color: theme.palette.primary.main,
              borderRadius: "999px",
              theme.typography.h2.fontWeight,
              fontSize: "0.75rem",
              textTransform: "none",
              py: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            fullWidth
          >
            Resume Training
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
