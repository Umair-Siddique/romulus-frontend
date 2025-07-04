import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Description as FileIcon } from "@mui/icons-material";

import { FileDisplayProps } from "#types";

export const FileDisplay = ({ file }: FileDisplayProps) => {
  const theme = useTheme<Theme>();

  if (!file) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        p: theme.spacing(1.5),
        borderRadius: theme.spacing(0.125),
        border: `1px solid ${theme.palette.divider}`,
        minWidth: 0,
        width: "100%",
      }}
    >
      <FileIcon
        sx={{
          color: theme.palette.primary.main,
          mr: theme.spacing(1),
          fontSize: 35,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.spacing(1.25),
          width: theme.spacing(5),
          height: theme.spacing(5),
          flexShrink: 0,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.primary,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
          flex: 1,
        }}
        title={file.name}
      >
        {file.name}
      </Typography>
    </Box>
  );
};
