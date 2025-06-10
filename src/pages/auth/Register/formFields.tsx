import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import { validationRules } from "../../../constants/validation";

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
        label: "Role",
        type: "radio",
        name: "role",
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
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Enter your email address",
        validationRules: validationRules.email,
      },
    ];

    if (userRole === "educator") {
      baseFields.push({
        label: "WhatsApp Number",
        type: "tel",
        name: "phone",
        placeholder: "Enter your WhatsApp number",
        validationRules: validationRules.phone,
      });
    }

    baseFields.push(
      {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        validationRules: validationRules.password,
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        placeholder: "Re-enter your password",
        validationRules: validationRules.confirmPassword,
      },
      {
        label: "I agree to the Terms and Conditions",
        type: "checkbox",
        name: "toc",
        placeholder: "",
        validationRules: validationRules.toc,
      }
    );
    return baseFields.map((field) => ({ ...field, ...commonFieldProps }));
  } else if (formStep === 3) {
    return [
      {
        type: "text",
        name: "verificationCode",
        placeholder: "",
        validationRules: validationRules.verificationCode,
        ...commonFieldProps,
      },
    ];
  }

  return [];
};
