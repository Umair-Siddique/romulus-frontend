export const formFields = (formType: string) => {
  switch (formType) {
    case "login":
      return [
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter your email address",
        },
        {
          label: "Password",
          type: "password",
          name: "password",
          placeholder: "Enter your password",
        },
      ];
    case "forgotPassword":
      return [
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter your email address",
        },
      ];

    case "updatePassword":
      return [
        {
          label: "Password",
          type: "password",
          name: "password",
          placeholder: "Enter your password",
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          placeholder: "Re-enter your password",
        },
      ];

    default:
      return [];
  }
};
