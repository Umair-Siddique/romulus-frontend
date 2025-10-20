import { Box, Alert } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { FormField } from "./form-field";
import { FormStepProps } from "#types";
import { useEffect, useState } from "react";
import { countriesCities } from "#lib/constants/data/countriesCities";

export const FormStep = ({
  title,
  fields,
  formData,
  onFieldChange,
  role,
}: FormStepProps) => {
  const [correspondingCities, setCorrespondingCities] = useState<string[]>([]);

  // Only update when the selected country changes
  useEffect(() => {
    const countryName = formData.country;
    if (countryName && countriesCities[countryName]) {
      setCorrespondingCities(countriesCities[countryName]);
    } else {
      setCorrespondingCities([]);
    }
  }, [formData.country]);

  const renderFields = () => {
    if (title === "Profile Setup") {
      const avatarField = fields.find((f) => f.name === "avatar");

      if (role === "educator") {
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
            {avatarField && (
              <FormField
                field={avatarField}
                value={formData[avatarField.name]}
                onChange={onFieldChange}
              />
            )}

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
                  cities={correspondingCities}
                />
              ))}
            </Box>

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
        const otherFields = fields.filter((f) => f.name !== "avatar");

        return (
          <Box>
            {avatarField && (
              <FormField
                field={avatarField}
                value={formData[avatarField.name]}
                onChange={onFieldChange}
              />
            )}

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
