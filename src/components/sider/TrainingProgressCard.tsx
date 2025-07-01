import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Box,
  Button,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from "@mui/icons-material";

export const TrainingProgressCard = ({ progress = 50 }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#2196f3",
        color: "white",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Training Progress
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            opacity: 0.9,
          }}
        >
          Complete training to unlock missions.
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50",
                borderRadius: 3,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              opacity: 0.9,
            }}
          >
            {progress}%
          </Typography>
        </Box>

        {/* Progress Items */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckIcon sx={{ fontSize: 16, mr: 1, color: "#4caf50" }} />
            <Typography variant="caption">2 of 4 videos completed</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <UncheckedIcon sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
            <Typography variant="caption">Quiz not attempted</Typography>
          </Box>
        </Stack>

        {/* Resume Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#2196f3",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Resume Training
        </Button>
      </CardContent>
    </Card>
  );
};
