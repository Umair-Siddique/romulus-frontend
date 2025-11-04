import { Box, Typography, Button, Theme, useTheme } from "@mui/material";
import {
  PlayCircle as PlayCircleIcon,
  Quiz as QuizIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { PageMeta } from "#components";

export const TrainingIntroduction = ({
  setStep,
}: {
  setStep: (step: 1 | 2) => void;
}) => {
  const theme = useTheme<Theme>();

  const checkList = [
    {
      id: 1,
      title: "Regarder les vidéos de formation",
      description:
        "Regardez des tutoriels vidéo faciles à suivre qui vous enseignent des compétences essentielles.",
      icon: <PlayCircleIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      id: 2,
      title: "Compléter les quiz",
      description:
        "Testez vos connaissances avec des quiz après avoir regardé les vidéos.",
      icon: <QuizIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      id: 3,
      title: "Suivre vos progrès",
      description:
        "Gardez une trace de vos modules complétés et débloquez de nouvelles missions au fur et à mesure.",
      icon: <TimelineIcon sx={{ color: theme.palette.primary.main }} />,
    },
  ];
  return (
    <>
      <PageMeta
        title="Bienvenue sur le portail de formation des éducateurs"
        description={`Nous sommes ravis de vous aider à commencer. Ce portail vous guidera étape par étape tout au long du processus de formation,
        vous aidant à débloquer des missions et à développer vos compétences.`}
      />
      <Box
        sx={{
          p: 2,
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: theme.typography.h4.fontWeight,
                mb: theme.spacing(1),
                color: theme.palette.text.primary,
                fontSize: "1.8rem",
                fontFamily: theme.typography.h5.fontFamily,
              }}
            >
              Quelles sont les prochaines étapes?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: theme.spacing(1),
                fontSize: "0.9375rem",
                lineHeight: theme.typography.body1.lineHeight,
                fontFamily: theme.typography.body1.fontFamily,
              }}
            >
              Avant de commencer, voici un aperçu rapide de ce que vous allez
              faire :
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            {checkList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(2),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.grey[200],
                    padding: theme.spacing(1),
                    borderRadius: 2,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: theme.typography.h4.fontWeight }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1">{item.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="img"
          src="/images/training.png"
          width={300}
          height={300}
        />
      </Box>
      <Box sx={{ mt: theme.spacing(2) }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: theme.typography.h4.fontWeight,
            mb: theme.spacing(1),
            color: theme.palette.text.primary,
            fontSize: "1.8rem",
            fontFamily: theme.typography.h5.fontFamily,
          }}
        >
          Prêt à commencer?
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: theme.spacing(1),
          }}
          onClick={() => setStep(2)}
        >
          Démarrer la formation
        </Button>
      </Box>
    </>
  );
};
