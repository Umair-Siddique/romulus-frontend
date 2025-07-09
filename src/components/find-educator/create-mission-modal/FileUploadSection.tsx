import { Box, Typography, useTheme, styled } from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { UseFormRegister } from "react-hook-form";
import { FormDataProps } from "#types";

interface FileUploadSectionProps {
  register: UseFormRegister<FormDataProps>;
  selectedDocument: File | null;
}

const UploadArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const FileUploadSection = ({
  register,
  selectedDocument,
}: FileUploadSectionProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        Upload Technical Document
      </Typography>
      <UploadArea
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <UploadIcon
          sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          Upload Technical Document
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Accepted formats: JPG, PNG, PDF (Max: 5MB)
        </Typography>
        {selectedDocument && (
          <Typography variant="body2" color="default" mt={1}>
            Selected: {selectedDocument.name}
          </Typography>
        )}
      </UploadArea>
      <input
        id="file-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        style={{ display: "none" }}
        {...register("technicalDocument")}
      />
    </Box>
  );
};
