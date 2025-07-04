import React from "react";

import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { OTPField } from "./OtpField";
import { TextInputField } from "./TextInputField";

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  options?: {
    icon: React.ReactElement;
    title: string;
    description: string;
    value: string;
  }[];
  validationRules?: any;
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  register: any;
  errors: Record<string, any>;
  setVerificationCode?: (code: string[]) => void;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  options,
  validationRules,
  setFormStep,
  setUserRole,
  register,
  errors,
  setVerificationCode,
}) => {
  if (type === "checkbox") {
    return (
      <CheckboxField
        label={label}
        name={name}
        validationRules={validationRules}
        register={register}
        errors={errors}
      />
    );
  }

  if (type === "radio" && options) {
    return (
      <RadioField
        options={options}
        setFormStep={setFormStep}
        setUserRole={setUserRole}
        errors={errors}
        name={name}
      />
    );
  }

  if (name === "verificationCode") {
    return (
      <OTPField
        label={label}
        name={name}
        register={register}
        errors={errors}
        setVerificationCode={setVerificationCode}
      />
    );
  }

  return (
    <TextInputField
      label={label}
      type={type}
      name={name}
      placeholder={placeholder}
      validationRules={validationRules}
      register={register}
      errors={errors}
    />
  );
};

export default FormField;

FormField.displayName = "FormField";