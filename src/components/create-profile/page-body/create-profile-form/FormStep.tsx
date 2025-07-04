import { Box, Alert } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

import { FormField } from "./form-field";

import { FormStepProps } from "#types";

export const FormStep = ({
  title,
  fields,
  formData,
  onFieldChange,
  role,
}: FormStepProps) => {
  const renderFields = () => {
    // Handle Profile Setup step with specific layout
    if (title === "Profile Setup") {
      const avatarField = fields.find((f) => f.name === "avatar");

      if (role === "educator") {
        // Educator layout: two-column for specific fields
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
            {avatarField && (
              <FormField
                field={avatarField}
                value={formData[avatarField.name]}
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
      } else if (role === "organization") {
        // Organization layout: single column for most fields
        const otherFields = fields.filter((f) => f.name !== "avatar");

        return (
          <Box>
            {/* Profile Picture */}
            {avatarField && (
              <FormField
                field={avatarField}
                value={formData[avatarField.name]}
                onChange={onFieldChange}
              />
            )}

            {/* All other fields in single column */}
            {otherFields.map((field) => (
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
    }

    // Default single column layout for all other steps
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
