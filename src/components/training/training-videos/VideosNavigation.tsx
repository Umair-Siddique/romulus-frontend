import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

import { Video } from "#types";

export const VideosNavigation = ({
  videosNavigationData,
  onVideoSelection,
  selectedVideo,
}: {
  videosNavigationData: { id: number; title: string; duration: string }[];
  onVideoSelection: (videoId: number) => void;
  selectedVideo: Video | undefined;
}) => {
  const theme = useTheme();

  const { id: selectedVideoId } = selectedVideo || {};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {videosNavigationData.map(({ id, title, duration }) => (
        <Box
          key={id}
          onClick={() => onVideoSelection(id)}
          sx={{
            py: 1,
            px: 2,
            width: "100%",
            cursor: "pointer",
            display: "flex",
            gap: 2,
            alignItems: "center",
            borderRadius: theme.shape.borderRadius,
            backgroundColor:
              selectedVideoId === id
                ? theme.palette.grey[100]
                : theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              p: 1,
              width: "20px",
              height: "20px",
              display: "flex",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedVideoId === id
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
            }}
          >
            <PlayArrow sx={{ color: "#fff", fontSize: "16px" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{title}</Typography>
            <Typography>{duration}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
