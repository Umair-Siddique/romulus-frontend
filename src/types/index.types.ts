export type RegisterVariables = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  role: string;
  toc: boolean | undefined;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type ForgotPasswordVariables = {
  email: string;
};

export type UpdatePasswordVariables = {
  password: string;
  confirmPassword?: string;
  accessToken: string;
};
