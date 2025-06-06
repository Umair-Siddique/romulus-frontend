export const validationRules = {
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
  },
  confirmPassword: {
    required: "Please confirm your password",
  },
  required: {
    required: "This field is required",
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\+\d{1,3}\s?\d{1,14}$/,
      message:
        "Please enter a valid phone number with country code (e.g., +923001234567)",
    },
    minLength: {
      value: 10,
      message: "Phone number must be at least 10 digits",
    },
  },
};
