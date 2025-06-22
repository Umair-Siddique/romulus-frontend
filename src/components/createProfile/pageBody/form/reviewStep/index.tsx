import React, { useState } from "react";
import { Box, Typography, Paper, Avatar, Chip, Button } from "@mui/material";
import {
  EditNoteOutlined as EditIcon,
  Description as FileIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { FormField } from "../formField";

export interface FormData {
  [key: string]: any;
}

interface ReviewStepProps {
  formData: FormData;
  onFieldChange: (name: string, value: any) => void;
  stepConfig: any;
  role?: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onFieldChange,
  stepConfig,
  role,
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

  const renderBranches = (branches: any) => {
    if (!Array.isArray(branches) || branches.length === 0) return null;

    return branches.map((branch: any, index: number) => (
      <Box
        key={index}
        sx={{
          border: "2px solid #A1B7AF",
          borderRadius: "12px",
          p: 3,
          mb: 2,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#3B4B44", mb: 2 }}
        >
          {branch.branchName || `Branch ${index + 1}`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PhoneIcon sx={{ color: "#A1B7AF", mr: 1, fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: "#3B4B44" }}>
            {branch.branchPhone}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <EmailIcon sx={{ color: "#A1B7AF", mr: 1, fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: "#3B4B44" }}>
            {branch.branchEmail}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon sx={{ color: "#A1B7AF", mr: 1, fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: "#3B4B44" }}>
            {branch.branchCity}, {branch.branchCountry}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BusinessIcon sx={{ color: "#A1B7AF", mr: 1, fontSize: 16 }} />
          <Typography variant="body2" sx={{ color: "#3B4B44" }}>
            {branch.branchAddress}
          </Typography>
        </Box>

        {branch.residenceGuidelines && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FileIcon sx={{ color: "#A1B7AF", mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "#3B4B44" }}>
              {branch.residenceGuidelines.name || "Residence_guideline.pdf"}
            </Typography>
          </Box>
        )}
      </Box>
    ));
  };

  const SectionHeader = ({
    title,
    onEdit,
    isEditing = false,
  }: {
    title: string;
    onEdit?: () => void;
    isEditing?: boolean;
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

      {!isEditing && (
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

  // Helper function to get fields for Identity section
  const getIdentityFields = () => [
    {
      name: "identityProof",
      label: "Identity Proof",
      type: "file" as const,
      required: true,
    },
    {
      name: "criminalRecord",
      label: "Criminal Record B3",
      type: "file" as const,
      required: true,
    },
  ];

  // Helper function to get fields for Profession section
  const getProfessionFields = () => [
    {
      name: "profession",
      label: "Profession",
      type: "text" as const,
      required: true,
    },
    {
      name: "hourlyRate",
      label: "Hourly Rate (€)",
      type: "number" as const,
      required: true,
    },
    {
      name: "skills",
      label: "Skills",
      type: "text" as const,
      required: false,
    },
    {
      name: "education",
      label: "Education",
      type: "text" as const,
      required: true,
    },
    {
      name: "certificateOfHonor",
      label: "Certificate of Honorability",
      type: "file" as const,
      required: false,
    },
    {
      name: "diploma",
      label: "Certificate/Diploma",
      type: "file" as const,
      required: false,
    },
  ];

  // Render Profile section based on role
  const renderProfileSection = () => {
    if (role === "educator") {
      return (
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
      );
    } else {
      // Organization layout - matches the image
      return (
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
                {formData.organizationName || "Organization name not provided"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
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

  const renderSectionContent = (
    sectionName: string,
    content: React.ReactNode,
    fields: any[]
  ) => {
    const isEditing = editingSection === sectionName;

    return (
      <Paper sx={{ p: 3, mb: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <SectionHeader
          title={getSectionTitle(sectionName)}
          onEdit={() => startEditing(sectionName)}
          isEditing={isEditing}
        />

        {isEditing ? (
          <>
            <Box sx={{ mb: 3 }}>
              {fields.map((field: any) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={
                    tempFormData.hasOwnProperty(field.name)
                      ? tempFormData[field.name]
                      : formData[field.name]
                  }
                  onChange={handleTempFieldChange}
                />
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={cancelEditing}
                startIcon={<CancelIcon />}
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#666",
                  "&:hover": {
                    borderColor: "#f44336",
                    backgroundColor: "rgba(244, 67, 54, 0.04)",
                    color: "#f44336",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={saveEditing}
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </>
        ) : (
          content
        )}
      </Paper>
    );
  };

  const getSectionTitle = (sectionName: string) => {
    switch (sectionName) {
      case "profile":
        return role === "educator"
          ? "Personal Information"
          : "Organization Information";
      case "branches":
        return "Branches";
      case "identity":
        return "Identity Proof";
      case "profession":
        return "Profession & Skills";
      default:
        return "";
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      {/* Organization/Personal Information Section */}
      {renderSectionContent(
        "profile",
        renderProfileSection(),
        stepConfig["Profile Setup"] || []
      )}

      {/* Branches Section - Only for organizations */}
      {role === "organization" &&
        renderSectionContent(
          "branches",
          renderBranches(formData.branches),
          stepConfig["Profile Setup"]?.filter(
            (field: any) => field.name === "branches"
          ) || []
        )}

      {/* Identity/Documents Section - Only for educators */}
      {role === "educator" && (
        <>
          {renderSectionContent(
            "identity",
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
            >
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
            </Box>,
            getIdentityFields()
          )}

          {/* Profession & Skills Section - Only for educators */}
          {renderSectionContent(
            "profession",
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

              {(formData.certificateOfHonor || formData.diploma) && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 3,
                  }}
                >
                  {formData.certificateOfHonor && (
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
                      {renderFileDisplay(formData.certificateOfHonor)}
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
            </>,
            getProfessionFields()
          )}
        </>
      )}
    </Box>
  );
};
