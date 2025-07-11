import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { InfoRow } from "./InfoRow";
import { SkillChips } from "./SkillChips";
import { FileDisplay } from "./FileDisplay";

import { ProfessionSectionProps } from "#types";

export const ProfessionSection = ({ formData }: ProfessionSectionProps) => {
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
                  fontWeight: theme.typography.h3.fontWeight,
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
                  fontWeight: theme.typography.h3.fontWeight,
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
