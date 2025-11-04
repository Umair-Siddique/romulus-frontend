import { Box, Typography, useTheme, styled } from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";

interface FileUploadSectionProps {
  selectedDocument: File | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any; // Remove this since we won't use it
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
  selectedDocument,
  handleFileUpload,
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
        Télécharger le document technique
      </Typography>
      <UploadArea
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <UploadIcon
          sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          Télécharger le document technique
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Formats acceptés : JPG, PNG, PDF (Max : 5 Mo)
        </Typography>
        {selectedDocument && (
          <Typography variant="body2" color="default" mt={1}>
            Sélectionné : {selectedDocument.name}
          </Typography>
        )}
      </UploadArea>
      <input
        id="file-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        // Remove the register call - this was causing the conflict
      />
    </Box>
  );
};
