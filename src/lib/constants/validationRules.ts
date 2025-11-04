export const validationRules = {
  firstName: {
    required: "Le prénom est requis",
    minLength: {
      value: 2,
      message: "Le prénom doit comporter au moins 2 caractères",
    },
    maxLength: {
      value: 50,
      message: "Le prénom ne peut pas dépasser 50 caractères",
    },
  },
  lastName: {
    required: "Le nom de famille est requis",
    minLength: {
      value: 2,
      message: "Le nom de famille doit comporter au moins 2 caractères",
    },
    maxLength: {
      value: 50,
      message: "Le nom de famille ne peut pas dépasser 50 caractères",
    },
  },
  email: {
    required: "L'email est requis",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Adresse email invalide",
    },
  },
  password: {
    required: "Le mot de passe est requis",
    minLength: {
      value: 8,
      message: "Le mot de passe doit comporter au moins 8 caractères",
    },
    maxLength: {
      value: 32,
      message: "Le mot de passe ne peut pas dépasser 32 caractères",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      message:
        "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
    },
  },
  confirmPassword: {
    required: "La confirmation du mot de passe est requise",
    minLength: {
      value: 8,
      message:
        "La confirmation du mot de passe doit comporter au moins 8 caractères",
    },
    maxLength: {
      value: 32,
      message:
        "La confirmation du mot de passe doit comporter au plus 32 caractères",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      message:
        "La confirmation du mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
    },
    validate: (value: string, formValues: any) => {
      return (
        value === formValues.password ||
        "Les mots de passe ne correspondent pas"
      );
    },
  },
  role: {
    required: "Le rôle est requis",
    minLength: {
      value: 2,
      message: "Le rôle doit comporter au moins 2 caractères",
    },
    maxLength: {
      value: 50,
      message: "Le rôle ne peut pas dépasser 50 caractères",
    },
  },
  required: {
    required: "Ce champ est requis",
  },
  phone: {
    required: "Le numéro WhatsApp est requis",
    pattern: {
      value: /^\+\d{1,3}\s?\d{1,14}$/,
      message:
        "Veuillez entrer un numéro WhatsApp valide avec l'indicatif du pays",
    },
    minLength: {
      value: 10,
      message: "Le numéro de téléphone doit comporter au moins 10 chiffres",
    },
  },
  toc: {
    required: "Vous devez accepter les termes et conditions",
    pattern: {
      value: /^true$/,
      message: "Vous devez accepter les termes et conditions",
    },
  },
  verificationCode: {
    required: "Le code de vérification est requis",
    pattern: {
      value: /^\d{6}$/,
      message: "Le code de vérification doit être un numéro à 6 chiffres",
    },
  },
};
