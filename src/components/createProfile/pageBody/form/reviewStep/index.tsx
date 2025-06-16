import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Description as FileIcon } from "@mui/icons-material";

export interface FormData {
  [key: string]: any;
}
interface ReviewStepProps {
  formData: FormData;
  role: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const renderFileDisplay = (file: any) => {
    if (!file) return null;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F0F8FF",
          p: 1,
          borderRadius: 1,
          border: "1px solid #E3F2FD",
        }}
      >
        <FileIcon sx={{ color: "#4A90E2", mr: 1 }} />
        <Typography variant="body2">{file.name}</Typography>
      </Box>
    );
  };

  const renderSkillChips = (skills: any) => {
    if (!Array.isArray(skills)) return null;
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {skills.map((skill: string, index: number) => (
          <Chip
            key={index}
            label={skill}
            size="small"
            sx={{ backgroundColor: "#E3F2FD" }}
          />
        ))}
      </Box>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <IconButton size="small" sx={{ color: "#666" }}>
        <EditIcon fontSize="small" />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          Edit
        </Typography>
      </IconButton>
    </Box>
  );

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
        {label}:
      </Typography>
      <Typography variant="body1">{value || "Not provided"}</Typography>
    </Box>
  );

  return (
    <Box>
      {/* Personal Info Section */}
      <Paper sx={{ p: 3, mb: 3, border: "1px solid #E0E0E0" }}>
        <SectionHeader title="Personal Info" />

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{ width: 60, height: 60, mr: 2 }}
            src={
              formData.profilePicture
                ? URL.createObjectURL(formData.profilePicture)
                : undefined
            }
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : "Name not provided"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {formData.gender || "Gender not specified"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <InfoRow label="Phone" value={formData.phone} />
          <InfoRow label="DOB" value={formData.dateOfBirth} />
          <InfoRow label="City" value={formData.city} />
          <InfoRow label="Country" value={formData.country} />
        </Box>

        <InfoRow label="Address" value={formData.fullAddress} />

        {formData.bio && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
              Bio
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "#F9F9F9",
                p: 2,
                borderRadius: 1,
                whiteSpace: "pre-wrap",
              }}
            >
              {formData.bio}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Identity Proof Section */}
      <Paper sx={{ p: 3, mb: 3, border: "1px solid #E0E0E0" }}>
        <SectionHeader title="Identity Proof" />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Identity Proof
            </Typography>
            {renderFileDisplay(formData.identityProof)}
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Criminal Record B3
            </Typography>
            {renderFileDisplay(formData.criminalRecord)}
          </Box>
        </Box>
      </Paper>

      {/* Profession & Skills Section */}
      <Paper sx={{ p: 3, mb: 4, border: "1px solid #E0E0E0" }}>
        <SectionHeader title="Profession & Skills" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mb: 3,
          }}
        >
          <InfoRow label="Profession" value={formData.profession} />
          <Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
              Hourly Rate:
            </Typography>
            <Typography variant="body1">
              {formData.hourlyRate ? `€${formData.hourlyRate}` : "Not provided"}
            </Typography>
          </Box>
        </Box>

        {formData.skills && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Skills
            </Typography>
            {renderSkillChips(formData.skills)}
          </Box>
        )}

        <InfoRow label="Education" value={formData.education} />

        {(formData.certificateOfOwner || formData.diploma) && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 3,
              mt: 3,
            }}
          >
            {formData.certificateOfOwner && (
              <Box>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  Certificate of Honorability
                </Typography>
                {renderFileDisplay(formData.certificateOfOwner)}
              </Box>
            )}

            {formData.diploma && (
              <Box>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  Certificate/Diploma
                </Typography>
                {renderFileDisplay(formData.diploma)}
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};
