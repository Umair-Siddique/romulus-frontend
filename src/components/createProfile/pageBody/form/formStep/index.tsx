import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { FormField } from "../formField";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "file" | "select" | "date" | "tel" | "number" | "email";
  required: boolean;
  options?: string[];
}

export interface FormData {
  [key: string]: any;
}
interface FormStepProps {
  title: string;
  fields: FieldConfig[];
  formData: FormData;
  onFieldChange: (name: string, value: any) => void;
}

export const FormStep: React.FC<FormStepProps> = ({
  title,
  fields,
  formData,
  onFieldChange,
}) => {
  const renderFields = () => {
    // Handle Profile Setup step with specific layout
    if (title === "Profile Setup") {
      const profilePictureField = fields.find(
        (f) => f.name === "profilePicture"
      );
      const twoColumnFields = fields.filter((f) =>
        [
          "firstName",
          "lastName",
          "gender",
          "dateOfBirth",
          "city",
          "country",
        ].includes(f.name)
      );
      const fullWidthFields = fields.filter((f) =>
        ["fullAddress", "bio"].includes(f.name)
      );

      return (
        <Box>
          {/* Profile Picture */}
          {profilePictureField && (
            <FormField
              field={profilePictureField}
              value={formData[profilePictureField.name]}
              onChange={onFieldChange}
            />
          )}

          {/* Two-column fields (first 6 fields) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            {twoColumnFields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={onFieldChange}
              />
            ))}
          </Box>

          {/* Full-width fields (fullAddress and bio) */}
          {fullWidthFields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={onFieldChange}
            />
          ))}
        </Box>
      );
    }

    // Default single column layout
    return (
      <Box>
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={onFieldChange}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {renderFields()}

      {/* Security notice for Identity step */}
      {title === "Identity" && (
        <Alert
          icon={<InfoIcon />}
          severity="info"
          sx={{
            mt: 3,
            backgroundColor: "#E3F2FD",
            border: "1px solid #BBDEFB",
            borderRadius: "8px",
          }}
        >
          Your documents are encrypted and securely stored. We comply with all
          data protection regulations and will only use these for verification
          purposes.
        </Alert>
      )}
    </Box>
  );
};
