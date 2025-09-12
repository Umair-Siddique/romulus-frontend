import { Box, Button, Typography } from "@mui/material";
import { AccessTime as DurationIcon } from "@mui/icons-material";

import { Video } from "#types";
import { PageMeta } from "#components";

export const VideoDisplay = ({
  onNext,
  selectedVideo,
}: {
  onNext: (videoId: number) => void;
  selectedVideo: Video | undefined;
}) => {
  return (
    <Box>
      <PageMeta title={selectedVideo?.title} />
      <Box sx={{ my: 2 }}>
        <video
          controls
          src={selectedVideo?.url}
          controlsList="nodownload"
          style={{
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "16/9",
            borderRadius: "12px",
          }}
        />
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Overview
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <DurationIcon sx={{ mr: 1, fontSize: 18 }} />{" "}
            {selectedVideo?.duration}
          </Typography>
        </Box>
        <Typography>{selectedVideo?.description}</Typography>
      </Box>

      <Button
        disabled={!selectedVideo}
        onClick={() => selectedVideo && onNext(selectedVideo.id)}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Next Video
      </Button>
    </Box>
  );
};
