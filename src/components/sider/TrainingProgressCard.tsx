import { Card, CardContent, Typography, Stack, useTheme } from "@mui/material";

import { useUserContext } from "#context";

export const TrainingProgressCard = () => {
  const theme = useTheme();
  const { userProfile } = useUserContext();

  const trainingStatus = userProfile?.trainingStatus;

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
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: theme.typography.h2.fontWeight }}
          >
            Progression de la formation
          </Typography>

          {/* Subtitle */}
          <Typography variant="caption" sx={{ lineHeight: 1.4 }}>
            Passez le quiz pour débloquer des missions.
          </Typography>

          {/* Quiz Status */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption">
              📝Quiz{" "}
              {trainingStatus === "completed"
                ? "terminé avec succès"
                : "non tenté"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
