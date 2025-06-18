export interface IFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url: string;
}

export interface AuthBackgroundProps {
  backgroundImage: string;
}

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserTypeCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  value?: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export interface FormProps {
  formTitle: string;
  formDescription: string;
  formfields: any[];
  formType: string;
  formStep?: number;
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  isLoading?: boolean;
  submitLoadingText?: string;
  submitLabel?: string;
  bottomTextWithLink?: React.ReactNode;
  handleSubmit?: any;
  onSubmit?: (data: any) => void;
  isFormValid?: boolean;
  hasErrors?: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
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
  onSubmit: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  showButton?: boolean;
  buttonText?: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "file" | "select" | "date" | "tel" | "number" | "email";
  required: boolean;
  options?: string[] | Record<string, string[]>;
  dependsOn?: string; // For dependent fields like city depends on country
}

export interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
  formData?: Record<string, any>; // Add formData to access other field values
}

export interface Branch {
  branchName: string;
  branchPhone: string;
  branchEmail: string;
  branchCity: string;
  branchCountry: string;
  branchAddress: string;
  residenceGuidelines?: File;
}
