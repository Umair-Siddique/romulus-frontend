import { Box, Alert } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { useEffect, useMemo } from "react";

import { FormStepProps } from "#types";
import { FormField } from "./form-field";
import { countriesCities } from "#lib/constants/data/countriesCities";

export const FormStep = ({
  title,
  fields,
  formData,
  onFieldChange,
  role,
}: FormStepProps) => {
  const correspondingCities = useMemo(() => {
    const countryName = formData.country?.trim().toLowerCase();
    const matchedKey = countryName
      ? Object.keys(countriesCities).find(
          (key) => key.trim().toLowerCase() === countryName
        )
      : null;

    return matchedKey && countriesCities[matchedKey]
      ? countriesCities[matchedKey]
      : [];
  }, [formData.country]);

  useEffect(() => {
    if (formData.city && !correspondingCities.includes(formData.city)) {
      onFieldChange("Ville", "");
    }
  }, [formData.country]);

  const renderFields = () => {
    if (title === "Profile Setup") {
      const avatarField = fields.find((f) => f.name === "avatar");

      // Inject dynamic city options for all roles
      const processedFields = fields.map((field) =>
        field.name === "city"
          ? { ...field, options: correspondingCities }
          : field
      );

      if (role === "educator") {
        const twoColumnFields = processedFields.filter((f) =>
          [
            "firstName",
            "lastName",
            "gender",
            "dateOfBirth",
            "city",
            "country",
          ].includes(f.name)
        );

        const fullWidthFields = processedFields.filter((f) =>
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
      }

      if (role === "organization") {
        const otherFields = processedFields.filter((f) => f.name !== "avatar");

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

    // Default fallback for other steps
    return (
      <Box>
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={
              field.name === "city"
                ? { ...field, options: correspondingCities }
                : field
            }
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
          Vos documents sont cryptés et stockés en toute sécurité. Nous
          respectons toutes les réglementations en matière de protection des
          données et n'utiliserons ces informations qu'à des fins de
          vérification.
        </Alert>
      )}
    </Box>
  );
};
