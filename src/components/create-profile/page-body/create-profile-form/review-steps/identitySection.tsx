import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { FileDisplay } from "./fileDisplay";
import { IdentitySectionProps } from "#types";

export const IdentitySection = ({ formData }: IdentitySectionProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: theme.spacing(3),
        minWidth: 0,
      }}
    >
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
          Identity Proof
        </Typography>
        <FileDisplay file={formData.identityProof} />
      </Box>

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
          Criminal Record B3
        </Typography>
        <FileDisplay file={formData.criminalRecord} />
      </Box>
    </Box>
  );
};
