import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

import { Video } from "#types";

const getChapter = (title: string): string => {
  const match = title.match(/^(Chapter \d+)/i);
  return match ? match[1] : "Other";
};

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

  const chapters = videosNavigationData.reduce<
    Record<string, { id: number; title: string; duration: string }[]>
  >((acc, video) => {
    const chapter = getChapter(video.title);
    if (!acc[chapter]) acc[chapter] = [];
    acc[chapter].push(video);
    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Object.entries(chapters).map(([chapter, videos]) => (
        <Box key={chapter}>
          <Typography
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {chapter}
          </Typography>
          {videos.map(({ id, title, duration }) => (
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
      ))}
    </Box>
  );
};
