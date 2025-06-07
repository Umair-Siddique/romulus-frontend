export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserType {
  id: "educator" | "organization";
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string | null; // Optional for organization, required for educator
  userType: string;
  role: string;
  agreeToTerms: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}
