import { Box, Typography, Avatar } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { InfoRow } from "./infoRow";

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
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : "Name not provided"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {formData.gender || "Gender not specified"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 0 }}>
          <InfoRow label="Date of Birth" value={formData.dateOfBirth} />
          <InfoRow label="City" value={formData.city} />
          <InfoRow label="Country" value={formData.country} />
          <InfoRow label="Address" value={formData.fullAddress} />
        </Box>

        {formData.bio && (
          <Box sx={{ mt: theme.spacing(3) }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                mb: theme.spacing(1),
                fontWeight: 500,
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
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {formData.organizationName || "Organization name not provided"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {formData.foundedYear
                ? `Founded: ${formData.foundedYear}`
                : "Founded year not specified"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 0 }}>
          <InfoRow label="Phone" value={formData.phone} />
          <InfoRow label="SIRET" value={formData.siretNumber} />
          <InfoRow label="Year Founded" value={formData.foundedYear} />
          <InfoRow label="Address" value={formData.officeAddress} />
        </Box>
      </>
    );
  }
};
