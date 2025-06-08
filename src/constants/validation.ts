export const validationRules = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "First name cannot exceed 50 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Last name cannot exceed 50 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 100,
      message: "Password cannot exceed 100 characters",
    },
  },
  confirmPassword: {
    required: "Re-enter your password",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 100,
      message: "Password cannot exceed 100 characters",
    },
  },
  role: {
    required: "Role is required",
    minLength: {
      value: 2,
      message: "Role must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Role cannot exceed 50 characters",
    },
  },
  required: {
    required: "This field is required",
  },
  phone: {
    required: "WhatsApp number is required",
    pattern: {
      value: /^\+\d{1,3}\s?\d{1,14}$/,
      message: "Please enter a valid WhatsApp number with country code",
    },
    minLength: {
      value: 10,
      message: "Phone number must be at least 10 digits",
    },
  },
  toc: {
    required: "You must agree to the Terms and Conditions",
    pattern: {
      value: /^true$/,
      message: "You must agree to the Terms and Conditions",
    },
  },
  verificationCode: {
    required: "Verification code is required",
    pattern: {
      value: /^\d{6}$/,
      message: "Verification code must be a 6-digit number",
    },
  },
};
