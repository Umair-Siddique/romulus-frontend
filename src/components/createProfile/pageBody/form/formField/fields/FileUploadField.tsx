import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  FileCopy as FileIcon,
} from "@mui/icons-material";

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
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        {label} {!required && "(Optional)"}
      </Typography>

      {value ? (
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(1),
            p: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", minWidth: 0, flex: 1 }}
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
              sx={{
                color: theme.palette.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
              title={value.name}
            >
              {value.name}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => onChange(null)}
            sx={{
              color: theme.palette.text.secondary,
              ml: theme.spacing(1),
              flexShrink: 0,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.light,
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
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: theme.spacing(1),
              p: theme.spacing(4),
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
              sx={{
                fontSize: 48,
                color: theme.palette.text.secondary,
                mb: theme.spacing(1),
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: theme.spacing(0.5),
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: theme.spacing(1),
                }}
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
            sx={{
              color: theme.palette.text.secondary,
              mt: theme.spacing(1),
              display: "block",
            }}
          >
            Accepted formats: JPG, PNG, PDF (Max: 5MB)
          </Typography>
        </Box>
      )}
    </Box>
  );
};
