import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { InfoRow } from "./infoRow";
import { SkillChips } from "./skillChips";
import { FileDisplay } from "./fileDisplay";

export interface FormData {
  [key: string]: any;
}

interface ProfessionSectionProps {
  formData: FormData;
}

export const ProfessionSection: React.FC<ProfessionSectionProps> = ({
  formData,
}) => {
  const theme = useTheme<Theme>();

  return (
    <>
      <Box sx={{ mb: theme.spacing(3) }}>
        <InfoRow label="Profession" value={formData.profession} />
        <InfoRow
          label="Hourly Rate"
          value={
            formData.hourlyRate ? `€${formData.hourlyRate}` : "Not provided"
          }
        />
      </Box>

      {formData.skills && (
        <Box sx={{ mb: theme.spacing(3) }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: theme.spacing(1.5),
              fontSize: "0.875rem",
            }}
          >
            Skills:
          </Typography>
          <SkillChips skills={formData.skills} />
        </Box>
      )}

      <Box sx={{ mb: theme.spacing(3) }}>
        <InfoRow label="Education" value={formData.education} />
      </Box>

      {(formData.certificateOfHonor || formData.diploma) && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.spacing(3),
            minWidth: 0,
          }}
        >
          {formData.certificateOfHonor && (
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  mb: theme.spacing(1.5),
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Certificate of Honorability
              </Typography>
              <FileDisplay file={formData.certificateOfHonor} />
            </Box>
          )}

          {formData.diploma && (
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary,
                  mb: theme.spacing(1.5),
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Certificate/Diploma
              </Typography>
              <FileDisplay file={formData.diploma} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
