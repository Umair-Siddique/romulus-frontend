import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Theme, Typography, useTheme } from "@mui/material";
import {
  PlayCircle as PlayCircleIcon,
  Quiz as QuizIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";

import { PageMeta } from "#components";
import { useUserContext } from "#context";

export const Training = () => {
  const theme = useTheme<Theme>();
  const { user } = useUserContext();
  const role = user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const checkList = [
    {
      id: 1,
      title: "Watch Training Videos",
      description:
        "Watch easy-to-follow video tutorials that teach you essential skills.",
      icon: <PlayCircleIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      id: 2,
      title: "Complete Quizzes",
      description: "Test your knowledge with quizzes after watching videos.",
      icon: <QuizIcon sx={{ color: theme.palette.primary.main }} />,
    },
    {
      id: 3,
      title: "Track Your Progress",
      description:
        "Keep track of your completed modules and unlock new missions as you go.",
      icon: <TimelineIcon sx={{ color: theme.palette.primary.main }} />,
    },
  ];

  return (
    <>
      <PageMeta
        title="Welcome to the Educator Training Portal"
        description={`We’re excited to help you get started. This portal will guide you step by step through the training process,  
        helping you unlock missions and build your skills.`}
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
              What's Next?
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
              Before you start, here's a quick overview of what you'll be doing:
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
          Ready to start?
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: theme.spacing(1),
          }}
        >
          Start Training
        </Button>
      </Box>
    </>
  );
};
