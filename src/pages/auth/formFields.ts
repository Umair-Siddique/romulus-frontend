export const formFields = (formType: string) => {
  switch (formType) {
    case "login":
      return [
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Entrez votre adresse e-mail",
        },
        {
          label: "Password",
          type: "password",
          name: "password",
          placeholder: "Entrez votre mot de passe",
        },
      ];
    case "forgotPassword":
      return [
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Entrez votre adresse e-mail",
        },
      ];

    case "updatePassword":
      return [
        {
          label: "Password",
          type: "password",
          name: "password",
          placeholder: "Entrez votre mot de passe",
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          placeholder: "Ressaisissez votre mot de passe",
        },
      ];

    default:
      return [];
  }
};
