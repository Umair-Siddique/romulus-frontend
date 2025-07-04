import React from "react";
import { Box } from "@mui/material";
import {
  AvatarField,
  SkillsField,
  FileUploadField,
  BranchesField,
  SelectField,
  DateField,
  NumberField,
  TextFieldComponent,
} from "./fields";
import { FormFieldProps } from "../../../../../interface";

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  formData = {},
}) => {
  const handleCountryChange = (newValue: string) => {
    onChange(field.name, newValue);

    // If this is a country field and there's a city field that depends on it, clear the city value
    if (field.name === "country" && formData.city) {
      onChange("city", "");
    }
  };

  // Get options for select fields
  const getSelectOptions = () => {
    if (
      field.name === "city" &&
      typeof field.options === "object" &&
      !Array.isArray(field.options)
    ) {
      // Get the selected country from formData
      const selectedCountry = formData.country;

      // Return cities for the selected country, or empty array if no country selected
      return selectedCountry && field.options[selectedCountry]
        ? field.options[selectedCountry]
        : [];
    }

    // For regular select fields with array options
    return Array.isArray(field.options) ? field.options : [];
  };

  const renderField = () => {
    // Profile Picture Upload
    if (field.name === "avatar") {
      return (
        <AvatarField
          value={value}
          onChange={(file) => onChange(field.name, file)}
        />
      );
    }

    // Skills with tags
    if (field.name === "skills") {
      return (
        <SkillsField
          value={value}
          onChange={(skills) => onChange(field.name, skills)}
          required={field.required}
        />
      );
    }

    // File Upload
    if (field.type === "file") {
      return (
        <FileUploadField
          fieldName={field.name}
          label={field.label}
          value={value}
          onChange={(file) => onChange(field.name, file)}
          required={field.required}
        />
      );
    }

    // Branches section
    if (field.name === "branches") {
      return (
        <BranchesField
          value={value}
          onChange={(branches) => onChange(field.name, branches)}
        />
      );
    }

    // Select dropdown
    if (field.type === "select") {
      const options = getSelectOptions();

      return (
        <SelectField
          label={field.label}
          value={value}
          onChange={
            field.name === "country"
              ? handleCountryChange
              : (newValue) => onChange(field.name, newValue)
          }
          options={options}
          required={field.required}
        />
      );
    }

    // Date input
    if (field.type === "date") {
      return (
        <DateField
          label={field.label}
          value={value}
          onChange={(newValue) => onChange(field.name, newValue)}
          required={field.required}
          placeholder={
            field.name === "dateOfBirth"
              ? "Select your date of birth"
              : "Select date"
          }
        />
      );
    }

    // Number input
    if (field.type === "number") {
      return (
        <NumberField
          fieldName={field.name}
          label={field.label}
          value={value}
          onChange={(newValue) => onChange(field.name, newValue)}
          required={field.required}
        />
      );
    }

    // Default text input (text, tel, email)
    return (
      <TextFieldComponent
        fieldName={field.name}
        label={field.label}
        type={field.type as "text" | "tel" | "email"}
        maxLength={field.maxlength}
        value={value}
        onChange={(newValue) => onChange(field.name, newValue)}
        required={field.required}
      />
    );
  };

  return <Box sx={{ mb: 3 }}>{renderField()}</Box>;
};

FormField.displayName = "FormField";
