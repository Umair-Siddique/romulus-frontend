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
        label: "Rôle",
        type: "radio",
        options: [
          {
            title: "Je suis un éducateur",
            description:
              "Je suis un éducateur cherchant à rejoindre cette plateforme en tant que membre pour m'engager dans des tâches et des missions.",
            value: "educator",
            icon: <PersonIcon />,
          },
          {
            title: "Je suis une organisation",
            description:
              "Je suis une organisation qui crée des tâches et invite des éducateurs à y participer.",
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
        placeholder: "Entrez votre adresse e-mail",
        validationRules: validationRules.email,
      },
    ];

    if (userRole === "educator") {
      baseFields.push({
        name: "phone",
        label: "Numéro WhatsApp",
        type: "tel",
        placeholder: "Entrez votre numéro WhatsApp",
        validationRules: validationRules.phone,
      });
    }

    baseFields.push(
      {
        name: "password",
        label: "Mot de passe",
        type: "password",
        placeholder: "Entrez votre mot de passe",
        validationRules: validationRules.password,
      },
      {
        name: "confirmPassword",
        label: "Confirmer le mot de passe",
        type: "password",
        placeholder: "Ressaisissez votre mot de passe",
        validationRules: validationRules.confirmPassword,
      },
      {
        name: "toc",
        label: "J'accepte les termes et conditions",
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
