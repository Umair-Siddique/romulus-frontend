import { Box, Card, CardContent, Typography } from "@mui/material";

export const QuizMeta = ({ quizMetaConfig }: { quizMetaConfig: any }) => {
  return (
    <Card sx={{ bgcolor: quizMetaConfig?.cardBgColor, mb: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {quizMetaConfig?.icon} {quizMetaConfig?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Labels */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            {quizMetaConfig?.fields?.map((field: any, i: number) => (
              <Typography
                key={i}
                color="textSecondary"
                sx={{ fontWeight: "bold" }}
              >
                {field.title}
              </Typography>
            ))}
          </Box>

          {/* Values */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            {quizMetaConfig?.fields?.map((field: any, i: number) => (
              <Typography key={i}>{field.value}</Typography>
            ))}
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {quizMetaConfig?.paragraphText}
        </Typography>
      </CardContent>
    </Card>
  );
};
