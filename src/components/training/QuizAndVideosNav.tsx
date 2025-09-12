import { Box, Button } from "@mui/material";
import { Link } from "react-router";

export const QuizAndVideosNav = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Link to="/training/videos">
        <Button variant="contained">Watch Videos</Button>
      </Link>
      <Link to="/training/quiz">
        <Button variant="contained">Take Quiz</Button>
      </Link>
    </Box>
  );
};
