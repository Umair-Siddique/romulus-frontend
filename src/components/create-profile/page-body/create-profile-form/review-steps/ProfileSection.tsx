import { Box, Typography, Avatar } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { InfoRow } from "./InfoRow";

import { ProfileSectionProps } from "#types";

export const ProfileSection = ({ formData, role }: ProfileSectionProps) => {
  const theme = useTheme<Theme>();

  if (role === "educator") {
    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", mb: theme.spacing(3) }}
        >
          <Avatar
            sx={{
              width: theme.spacing(6),
              height: theme.spacing(6),
              mr: theme.spacing(2),
            }}
            src={
              formData.avatar ? URL.createObjectURL(formData.avatar) : undefined
            }
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: theme.typography.h2.fontWeight,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : "Nom non fourni"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {formData.gender || "Genre non spécifié"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 0 }}>
          <InfoRow label="Date de naissance" value={formData.dateOfBirth} />
          <InfoRow label="Ville" value={formData.city} />
          <InfoRow label="Pays" value={formData.country} />
          <InfoRow label="Adresse" value={formData.fullAddress} />
        </Box>

        {formData.bio && (
          <Box sx={{ mt: theme.spacing(3) }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                mb: theme.spacing(1),
                fontWeight: theme.typography.h3.fontWeight,
                fontSize: "0.875rem",
              }}
            >
              Bio
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                fontSize: "0.875rem",
                p: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}
            >
              {formData.bio}
            </Typography>
          </Box>
        )}
      </>
    );
  } else {
    // Organization layout
    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", mb: theme.spacing(3) }}
        >
          <Avatar
            sx={{
              width: theme.spacing(6),
              height: theme.spacing(6),
              mr: theme.spacing(2),
            }}
            src={
              formData.avatar ? URL.createObjectURL(formData.avatar) : undefined
            }
          />
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: theme.typography.h2.fontWeight,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {formData.organizationName || "Nom de l'organisation non fourni"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {formData.foundedYear
                ? `Fondée: ${formData.foundedYear}`
                : "Année de création non spécifiée"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 0 }}>
          <InfoRow label="Téléphone" value={formData.phone} />
          <InfoRow label="SIRET" value={formData.siretNumber} />
          <InfoRow label="Date de création" value={formData.foundedYear} />
          <InfoRow label="Adresse" value={formData.officeAddress} />
        </Box>
      </>
    );
  }
};
