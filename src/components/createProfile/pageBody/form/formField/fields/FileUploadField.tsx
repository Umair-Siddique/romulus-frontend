import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  FileCopy as FileIcon,
} from "@mui/icons-material";
import { colors } from "../styles";

interface FileUploadFieldProps {
  fieldName: string;
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  fieldName,
  label,
  value,
  onChange,
  required = false,
}) => {
  const theme = useTheme<Theme>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const getFileUploadContent = () => {
    switch (fieldName) {
      case "identityProof":
        return {
          title: "Upload government-issued ID",
          subtitle: "(Passport, Driver's License, National ID Card)",
        };
      case "criminalRecord":
        return {
          title: "Upload your Criminal Record B3",
          subtitle: "(Police clearance or background check document)",
        };
      case "certificateOfHonor":
        return {
          title: "Upload Certificate of Honorability",
          subtitle: "",
        };
      case "diploma":
        return {
          title: "Upload Certificate/Diploma",
          subtitle: "",
        };
      default:
        return {
          title: `Upload ${label}`,
          subtitle: "",
        };
    }
  };

  const { title, subtitle } = getFileUploadContent();

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        {label} {!required && "(Optional)"}
      </Typography>

      {value ? (
        <Box
          sx={{
            border: `1px solid ${colors.borderLight}`,
            borderRadius: "8px",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.background,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FileIcon
              sx={{
                color: colors.primary,
                mr: 1,
                fontSize: 35,
                border: `1px solid ${colors.primary}`,
                borderRadius: "10px",
                width: "40px",
                height: "40px",
              }}
            />
            <Typography sx={{ color: colors.text }}>{value.name}</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => onChange(null)}
            sx={{
              color: colors.textSecondary,
              "&:hover": {
                color: colors.primary,
                backgroundColor: colors.primaryLight,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Box>
          <Box
            component="label"
            sx={{
              border: `2px dashed ${colors.border}`,
              borderRadius: "8px",
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: theme.palette.background.default,
              display: "block",
              "&:hover": {
                borderColor: theme.palette.primary.light,
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <UploadIcon
              sx={{ fontSize: 48, color: colors.textSecondary, mb: 1 }}
            />
            <Typography variant="body1" sx={{ color: colors.text, mb: 0.5 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{ color: colors.textSecondary, mb: 1 }}
              >
                {subtitle}
              </Typography>
            )}
            <input
              type="file"
              hidden
              onChange={handleChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: colors.textSecondary, mt: 1, display: "block" }}
          >
            Accepted formats: JPG, PNG, PDF (Max: 5MB)
          </Typography>
        </Box>
      )}
    </Box>
  );
};
