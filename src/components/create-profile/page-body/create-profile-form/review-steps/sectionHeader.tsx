import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { EditNoteOutlined as EditIcon } from "@mui/icons-material";

import { SectionHeaderProps } from "#types";

export const SectionHeader = ({
  title,
  onEdit,
  isEditing = false,
}: SectionHeaderProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: theme.spacing(3),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.h6.fontWeight,
          color: theme.palette.text.primary,
          fontSize: "1.125rem",
        }}
      >
        {title}
      </Typography>

      {!isEditing && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.secondary,
            cursor: "pointer",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(0.25),
            padding: theme.spacing(0.5, 1),
          }}
          onClick={onEdit}
        >
          <EditIcon sx={{ fontSize: 25, mr: theme.spacing(0.5) }} />
          <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
            Edit
          </Typography>
        </Box>
      )}
    </Box>
  );
};
