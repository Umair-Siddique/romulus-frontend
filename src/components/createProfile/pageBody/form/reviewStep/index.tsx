import React, { useState } from "react";
import { Box, Typography, Paper, Avatar, Chip, Button } from "@mui/material";
import {
  EditNoteOutlined as EditIcon,
  Description as FileIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { FormField } from "../formField";

export interface FormData {
  [key: string]: any;
}

interface ReviewStepProps {
  formData: FormData;
  onFieldChange: (name: string, value: any) => void;
  stepConfig: any;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onFieldChange,
  stepConfig,
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempFormData, setTempFormData] = useState<FormData>({});

  const startEditing = (section: string) => {
    setEditingSection(section);
    setTempFormData({ ...formData });
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setTempFormData({});
  };

  const saveEditing = () => {
    Object.keys(tempFormData).forEach((key) => {
      onFieldChange(key, tempFormData[key]);
    });
    setEditingSection(null);
    setTempFormData({});
  };

  const handleTempFieldChange = (name: string, value: any) => {
    setTempFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderFileDisplay = (file: any) => {
    if (!file) return null;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          p: 1.5,
          borderRadius: 1,
          border: "1px solid #E0E0E0",
        }}
      >
        <FileIcon
          sx={{
            color: "#A1B7AF",
            mr: 1,
            fontSize: 35,
            border: "1px solid #A1B7AF",
            borderRadius: "10px",
            width: "40px",
            height: "40px",
          }}
        />
        <Typography variant="body2" sx={{ color: "#333" }}>
          {file.name}
        </Typography>
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
            sx={{
              backgroundColor: "#E8F4FD",
              color: "#333",
              fontSize: "0.875rem",
            }}
          />
        ))}
      </Box>
    );
  };

  const SectionHeader = ({
    title,
    onEdit,
    isEditing = false,
    onSave,
    onCancel,
  }: {
    title: string;
    onEdit?: () => void;
    isEditing?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#000",
          fontSize: "1.125rem",
        }}
      >
        {title}
      </Typography>

      {isEditing ? (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            onClick={onSave}
            startIcon={<SaveIcon />}
            sx={{ color: "#4CAF50", fontSize: "0.75rem" }}
          >
            Save
          </Button>
          <Button
            size="small"
            onClick={onCancel}
            startIcon={<CancelIcon />}
            sx={{ color: "#f44336", fontSize: "0.75rem" }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#666",
            cursor: "pointer",
            border: "1px solid #E0E0E0",
            borderRadius: 2,
            padding: "4px 8px",
          }}
          onClick={onEdit}
        >
          <EditIcon sx={{ fontSize: 25, mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
            Edit
          </Typography>
        </Box>
      )}
    </Box>
  );

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ display: "flex", mb: 1.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          minWidth: "120px",
          fontSize: "0.875rem",
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#000",
          ml: 2,
          fontSize: "0.875rem",
        }}
      >
        {value || "Not provided"}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      {/* Personal Info Section */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <SectionHeader
          title="Personal Information"
          onEdit={() => startEditing("personal")}
          isEditing={editingSection === "personal"}
          onSave={saveEditing}
          onCancel={cancelEditing}
        />

        {editingSection === "personal" ? (
          <Box>
            {stepConfig["Profile Setup"]?.map((field: any) => (
              <FormField
                key={field.name}
                field={field}
                value={tempFormData[field.name] ?? formData[field.name]}
                onChange={handleTempFieldChange}
              />
            ))}
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{ width: 48, height: 48, mr: 2 }}
                src={
                  formData.profilePicture
                    ? URL.createObjectURL(formData.profilePicture)
                    : undefined
                }
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#000",
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
                    color: "#666",
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
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#000",
                    mb: 1,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  Bio
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                    fontSize: "0.875rem",
                    p: 2,
                    backgroundColor: "#F9F9F9",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {formData.bio}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Identity Proof Section */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <SectionHeader
          title="Identity Proof"
          onEdit={() => startEditing("identity")}
          isEditing={editingSection === "identity"}
          onSave={saveEditing}
          onCancel={cancelEditing}
        />

        {editingSection === "identity" ? (
          <Box>
            {stepConfig["Identity"]?.map((field: any) => (
              <FormField
                key={field.name}
                field={field}
                value={tempFormData[field.name] ?? formData[field.name]}
                onChange={handleTempFieldChange}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#000",
                  mb: 1.5,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Identity Proof
              </Typography>
              {renderFileDisplay(formData.identityProof)}
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#000",
                  mb: 1.5,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Criminal Record B3
              </Typography>
              {renderFileDisplay(formData.criminalRecord)}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Profession & Skills Section */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <SectionHeader
          title="Profession & Skills"
          onEdit={() => startEditing("profession")}
          isEditing={editingSection === "profession"}
          onSave={saveEditing}
          onCancel={cancelEditing}
        />

        {editingSection === "profession" ? (
          <Box>
            {stepConfig["Profession"]?.map((field: any) => (
              <FormField
                key={field.name}
                field={field}
                value={tempFormData[field.name] ?? formData[field.name]}
                onChange={handleTempFieldChange}
              />
            ))}
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <InfoRow label="Profession" value={formData.profession} />
              <InfoRow
                label="Hourly Rate"
                value={
                  formData.hourlyRate
                    ? `€${formData.hourlyRate}`
                    : "Not provided"
                }
              />
            </Box>

            {formData.skills && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 1.5,
                    fontSize: "0.875rem",
                  }}
                >
                  Skills:
                </Typography>
                {renderSkillChips(formData.skills)}
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <InfoRow label="Education" value={formData.education} />
            </Box>

            {(formData.certificateOfOwner || formData.diploma) && (
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
              >
                {formData.certificateOfOwner && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#000",
                        mb: 1.5,
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      Certificate of Honorability
                    </Typography>
                    {renderFileDisplay(formData.certificateOfOwner)}
                  </Box>
                )}

                {formData.diploma && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#000",
                        mb: 1.5,
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      Certificate/Diploma
                    </Typography>
                    {renderFileDisplay(formData.diploma)}
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};
