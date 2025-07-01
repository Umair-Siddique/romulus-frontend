import React, { useState } from "react";
import { Box, Paper, Button } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { FormField } from "../formField";

// Import the split components
import { SectionHeader } from "./sectionHeader";
import { ProfileSection } from "./profileSection";
import { BranchesSection } from "./branchesSection";
import { IdentitySection } from "./identitySection";
import { ProfessionSection } from "./professionSection";

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
  const theme = useTheme<Theme>();

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

  const renderSectionContent = (
    sectionName: string,
    content: React.ReactNode,
    fields: any[]
  ) => {
    const isEditing = editingSection === sectionName;

    return (
      <Paper
        sx={{
          p: theme.spacing(3),
          mb: theme.spacing(3),
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <SectionHeader
          title={getSectionTitle(sectionName)}
          onEdit={() => startEditing(sectionName)}
          isEditing={isEditing}
        />

        {isEditing ? (
          <>
            <Box sx={{ mb: theme.spacing(3) }}>
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
                gap: theme.spacing(2),
                mt: theme.spacing(3),
              }}
            >
              <Button
                variant="outlined"
                onClick={cancelEditing}
                startIcon={<CancelIcon />}
                sx={{
                  borderColor: theme.palette.primary.light,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.primary.contrastText,
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
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
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
    <Box sx={{ maxWidth: theme.spacing(100), mx: "auto" }}>
      {/* Organization/Personal Information Section */}
      {renderSectionContent(
        "profile",
        <ProfileSection formData={formData} role={role} />,
        stepConfig["Profile Setup"] || []
      )}

      {/* Branches Section - Only for organizations */}
      {role === "organization" &&
        renderSectionContent(
          "branches",
          <BranchesSection branches={formData.branches} />,
          stepConfig["Profile Setup"]?.filter(
            (field: any) => field.name === "branches"
          ) || []
        )}

      {/* Identity/Documents Section - Only for educators */}
      {role === "educator" && (
        <>
          {renderSectionContent(
            "identity",
            <IdentitySection formData={formData} />,
            getIdentityFields()
          )}

          {/* Profession & Skills Section - Only for educators */}
          {renderSectionContent(
            "profession",
            <ProfessionSection formData={formData} />,
            getProfessionFields()
          )}
        </>
      )}
    </Box>
  );
};
