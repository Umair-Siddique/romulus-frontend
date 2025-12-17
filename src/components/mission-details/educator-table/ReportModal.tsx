import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import FlagIcon from "@mui/icons-material/Flag";
import UploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ReportModal = ({
  theme,
  reportModalOpen,
  handleCloseReportModal,
  reportingEducatorName,
  reportReason,
  setReportReason,
  reportEvidence,
  handleSubmitReport,
  handleFileUpload,
}: {
  theme: Theme;
  reportModalOpen: boolean;
  handleCloseReportModal: () => void;
  reportingEducatorName: string;
  reportReason: string;
  setReportReason: (reason: string) => void;
  reportEvidence: File | null;
  handleSubmitReport: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Modal
      open={reportModalOpen}
      onClose={handleCloseReportModal}
      aria-labelledby="report-modal-title"
      aria-describedby="report-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          bgcolor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          p: 4,
        }}
      >
        {/* Flag Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <FlagIcon
            sx={{
              fontSize: 48,
              color: "#ff4444",
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          id="report-modal-title"
          variant="h3"
          component="h3"
          align="center"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Signaler {reportingEducatorName}
        </Typography>

        {/* Description */}
        <Typography
          id="report-modal-description"
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.5,
          }}
        >
          Vous signalez {reportingEducatorName} pour un problème survenu lors
          d'une session. Veuillez décrire clairement ce qui s'est passé et
          joindre toute preuve pertinente. Ce rapport sera examiné par l'équipe
          d'administration de Romulus et restera confidentiel.
        </Typography>

        {/* Add Reason Label */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: "medium",
          }}
        >
          Ajouter une raisonq*
        </Typography>

        {/* Reason TextField */}
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Écrivez ici..."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />

        {/* Upload Evidence Label */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: "medium",
          }}
        >
          Télécharger une preuve
        </Typography>

        {/* Upload Area */}
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 1,
            p: 3,
            textAlign: "center",
            mb: 3,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          onClick={() => document.getElementById("file-upload-input")?.click()}
        >
          <input
            id="file-upload-input"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <UploadIcon
            sx={{
              fontSize: 32,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "medium",
              mb: 0.5,
            }}
          >
            {reportEvidence ? reportEvidence.name : "Upload"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Formats acceptés : JPG, PNG, PDF (Max : 5 Mo)
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            onClick={handleCloseReportModal}
            sx={{
              minWidth: 100,
              color: theme.palette.primary.main,
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitReport}
            disabled={!reportReason.trim()}
            sx={{
              minWidth: 120,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Soumettre le rapport
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReportModal;
