import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Description as FileIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

interface BranchCardProps {
  branch: any;
  index: number;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, index }) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(1.5),
        p: theme.spacing(3),
        mb: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.h6.fontWeight,
          color: theme.palette.text.primary,
          mb: theme.spacing(2),
        }}
      >
        {branch.branchName || `Branch ${index + 1}`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}>
        <PhoneIcon
          sx={{
            color: theme.palette.primary.main,
            mr: theme.spacing(1),
            fontSize: 16,
          }}
        />
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {branch.branchPhone}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}>
        <EmailIcon
          sx={{
            color: theme.palette.primary.main,
            mr: theme.spacing(1),
            fontSize: 16,
          }}
        />
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {branch.branchEmail}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}>
        <LocationOnIcon
          sx={{
            color: theme.palette.primary.main,
            mr: theme.spacing(1),
            fontSize: 16,
          }}
        />
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {branch.branchCity}, {branch.branchCountry}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
        <BusinessIcon
          sx={{
            color: theme.palette.primary.main,
            mr: theme.spacing(1),
            fontSize: 16,
          }}
        />
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {branch.branchAddress}
        </Typography>
      </Box>

      {branch.residenceGuidelines && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FileIcon
            sx={{
              color: theme.palette.primary.main,
              mr: theme.spacing(1),
              fontSize: 20,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            {branch.residenceGuidelines.name || "Residence_guideline.pdf"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
