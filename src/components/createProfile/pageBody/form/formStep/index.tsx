import React from "react";
import { Box, Typography } from "@mui/material";
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
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {title}
      </Typography>

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
