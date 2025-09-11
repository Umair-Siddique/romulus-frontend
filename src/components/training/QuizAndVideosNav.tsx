import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TrainingQuiz } from "./training-quiz";
import { TrainingVideos } from "./TrainingVideos";

export const QuizAndVideosNav = () => {
  const [displayVideos, setDisplayVideos] = useState(false);
  const [displayQuiz, setDisplayQuiz] = useState(false);

  const handleVideoClick = () => {
    setDisplayVideos(true);
    setDisplayQuiz(false);
  };

  const handleQuizClick = () => {
    setDisplayVideos(false);
    setDisplayQuiz(true);
  };

  return (
    <>
      {!(displayVideos || displayQuiz) && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={handleVideoClick} variant="contained">
            Watch Videos
          </Button>
          <Button onClick={handleQuizClick} variant="contained">
            Take Quiz
          </Button>
        </Box>
      )}
      {displayVideos && <TrainingVideos />}
      {displayQuiz && <TrainingQuiz />}
    </>
  );
};
