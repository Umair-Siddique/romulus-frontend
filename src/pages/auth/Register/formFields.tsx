import {
  CorporateFare as CorporateFareIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import { validationRules } from "#lib";

export const getFormFields = (
  form: any,
  formStep: number,
  userRole: string
) => {
  const commonFieldProps = {
    register: form.register,
    errors: form.formState.errors,
  };

  if (formStep === 1) {
    return [
      {
        name: "role",
        label: "Role",
        type: "radio",
        options: [
          {
            title: "I'm Educator",
            description:
              "I am an educator looking to join as a member of this platform to engage with tasks and missions.",
            value: "educator",
            icon: <PersonIcon />,
          },
          {
            title: "I'm Organization",
            description:
              "I am an organization that creates tasks and invites educators to participate in them.",
            value: "organization",
            icon: <CorporateFareIcon />,
          },
        ],
        validationRules: validationRules.role,
        ...commonFieldProps,
      },
    ];
  } else if (formStep === 2) {
    const baseFields = [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email address",
        validationRules: validationRules.email,
      },
    ];

    if (userRole === "educator") {
      baseFields.push({
        name: "phone",
        label: "WhatsApp Number",
        type: "tel",
        placeholder: "Enter your WhatsApp number",
        validationRules: validationRules.phone,
      });
    }

    baseFields.push(
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        validationRules: validationRules.password,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Re-enter your password",
        validationRules: validationRules.confirmPassword,
      },
      {
        name: "toc",
        label: "I agree to the Terms and Conditions",
        type: "checkbox",
        placeholder: "",
        validationRules: validationRules.toc,
      }
    );
    return baseFields.map((field) => ({ ...field, ...commonFieldProps }));
  } else if (formStep === 3) {
    return [
      {
        name: "verificationCode",
        type: "text",
        placeholder: "",
        validationRules: validationRules.verificationCode,
        ...commonFieldProps,
      },
    ];
  }

  return [];
};
