import { handleDownload } from "#utils";
import { Description, Download } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";

export const DocumentDownloadSection = memo(
  ({
    residenceGuidelines,
  }: {
    residenceGuidelines: { name: string; url: string };
  }) => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Paper
          sx={{
            p: theme.spacing(2),
            backgroundColor: theme.palette.grey[50],
            border: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: theme.shape.borderRadius,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: theme.spacing(2),
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <Description sx={{ color: theme.palette.primary.main }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.text.primary,
                }}
              >
                {residenceGuidelines.name}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => handleDownload(residenceGuidelines.url)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.common.black,
                backgroundColor: theme.palette.background.default,
                fontWeight: theme.typography.fontWeightMedium,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              Download
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }
);

DocumentDownloadSection.displayName = "DocumentDownloadSection";
