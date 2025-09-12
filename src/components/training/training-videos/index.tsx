import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Video } from "#types";
import { VideoDisplay } from "./VideoDisplay";
import { VideosNavigation } from "./VideosNavigation";
import { videosData } from "#constants";

const videosNavigationData = videosData.map(({ id, title, duration }) => ({
  id,
  title,
  duration,
}));

export const TrainingVideos = () => {
  const theme = useTheme();

  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    videosData[0]
  );

  const handleVideoSelection = (videoId: number) => {
    setSelectedVideo(videosData.find((video) => video.id === videoId));
  };

  const handleNext = (videoId: number) => {
    const currentIndex = videosData.findIndex((v) => v.id === videoId);

    if (currentIndex >= 0 && currentIndex < videosData.length - 1) {
      setSelectedVideo(videosData[currentIndex + 1]);
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Box sx={{ width: "65%", px: 2 }}>
        <VideoDisplay onNext={handleNext} selectedVideo={selectedVideo} />
      </Box>
      <Box sx={{ width: "35%", mt: 15 }}>
        <VideosNavigation
          videosNavigationData={videosNavigationData}
          onVideoSelection={handleVideoSelection}
          selectedVideo={selectedVideo}
        />
      </Box>
    </Box>
  );
};
