import React from "react";
import { Theme } from "@mui/material/styles";
import { Box, Button, Typography, Paper } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

interface FileCardProps {
  label: string;
  field: string;
  value: string;
  handleChange: (field: string, value: string) => void;
  handleFileChange: (field: string, file: File | null) => void;
  theme: Theme;
}

export const FileCard: React.FC<FileCardProps> = ({
  label,
  field,
  value,
  handleChange,
  handleFileChange,
  theme,
}) => (
  <Paper
    variant="outlined"
    sx={{
      width: "100%",
      p: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: theme.spacing(2) }}>
      <Box
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius,
          width: theme.spacing(8),
          height: theme.spacing(8),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DescriptionIcon
          sx={{
            fontSize: theme.typography.pxToRem(48),
            color: theme.palette.primary.main,
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.primary,
        }}
      >
        {label}
      </Typography>
    </Box>

    <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
      <Button variant="outlined" component="label">
        Télécharger
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleFileChange(field, e.target.files[0])
          }
        />
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleChange(field, "")}
        color="error"
        sx={{ border: "none", textDecoration: "underline" }}
        disabled={!value}
      >
        Supprimer
      </Button>
    </Box>
  </Paper>
);
