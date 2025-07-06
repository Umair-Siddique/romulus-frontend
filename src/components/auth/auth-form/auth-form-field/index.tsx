import { OTPField } from "./OtpField";
import { RadioField } from "./radio-field";
import { CheckboxField } from "./CheckboxField";
import { TextInputField } from "./TextInputField";

import { AuthFormFieldProps } from "#types";

const AuthFormField = ({
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
}: AuthFormFieldProps) => {
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

export default AuthFormField;

AuthFormField.displayName = "AuthFormField";
