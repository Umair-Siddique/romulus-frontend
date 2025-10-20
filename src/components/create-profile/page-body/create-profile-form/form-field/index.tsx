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

import { FormFieldProps } from "#types";

export const FormField = ({
  field,
  value,
  onChange,
  cities,
}: FormFieldProps) => {
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
      return (
        <SelectField
          label={field.label}
          value={value}
          onChange={(newValue: string) => onChange(field.name, newValue)}
          options={
            field.name === "city"
              ? cities ?? []
              : Array.isArray(field.options)
              ? field.options
              : []
          }
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
