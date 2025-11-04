import { Box, Button } from "@mui/material";
import { Link } from "react-router";

export const QuizAndVideosNav = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Link to="/training/videos">
        <Button variant="contained">Regarder les vidéos</Button>
      </Link>
      <Link to="/training/quiz">
        <Button variant="contained">Passer le Quiz</Button>
      </Link>
    </Box>
  );
};
