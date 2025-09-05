import { Dispatch, ReactElement, SetStateAction } from "react";

export interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  userProfile: any;
  setUserProfile: (profile: any) => void;
  refetchUserProfile?: () => void | undefined;
  setRefetchUserProfile?: Dispatch<SetStateAction<any>>;
}

export interface AuthBackgroundProps {
  backgroundImage: string;
}

export interface AuthFormProps {
  formTitle?: string;
  formDescription?: string;
  formFields: any[];
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
  phoneNumber?: string;
}

export interface AuthFormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  options?: {
    icon: React.ReactElement;
    title: string;
    description: string;
    value: string;
  }[];
  validationRules?: any;
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  register: any;
  errors: Record<string, any>;
  setVerificationCode?: (code: string[]) => void;
}

export interface SubmitButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText: string;
  loadedText: string;
}

export interface CheckboxFieldProps {
  label: string;
  name: string;
  validationRules?: any;
  register: any;
  errors: Record<string, any>;
}

export interface OTPFieldProps {
  label: string;
  name: string;
  register: any;
  errors: Record<string, any>;
  setVerificationCode?: (code: string[]) => void;
}

interface RadioFieldOption {
  icon: React.ReactElement;
  title: string;
  description: string;
  value: string;
}

export interface RadioFieldProps {
  options: RadioFieldOption[];
  setFormStep?: (step: number) => void;
  setUserRole?: (role: string) => void;
  errors: Record<string, any>;
  name: string;
}

export interface TextInputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  validationRules?: any;
  register: any;
  errors: Record<string, any>;
}

export interface AuthFormHeaderProps {
  title: string;
  description: string;
}

type UserVariant = any | null;

export interface PageBodyProps {
  user: UserVariant;
}

export interface FormDataProps {
  [key: string]: any;
}

export interface CreateProfileFormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
  role: string | null;
  user?: any;
}

interface FieldConfig {
  maxlength?: number | undefined;
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

export interface BranchModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (branchData: any, editIndex?: number) => void;
  editBranch?: any; // Branch data to edit
  editIndex?: number; // Index of branch being edited
}

export interface TextFieldComponentProps {
  fieldName: string;
  label: string;
  type: "text" | "tel" | "email";
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
}

export interface SkillsFieldProps {
  value: string[];
  onChange: (skills: string[]) => void;
  required?: boolean;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

export interface NumberFieldProps {
  fieldName: string;
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  required?: boolean;
  placeholder?: string;
  startAdornment?: string;
  endAdornment?: string;
}

export interface FileUploadFieldProps {
  fieldName: string;
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
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

export interface BranchesFieldProps {
  value: Branch[];
  onChange: (branches: Branch[]) => void;
}

export interface AvatarFieldProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export interface FormStepProps {
  title: string;
  fields: FieldConfig[];
  formData: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
  role?: string | null; // Add role prop to determine layout
}

export interface ReviewStepProps {
  formData: FormDataProps;
  onFieldChange: (name: string, value: any) => void;
  stepConfig: any;
  role?: string | null;
}

export interface UserTypeCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  value?: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

type TOCVariant = boolean | undefined;

export interface BranchCardProps {
  branch: any;
  index: number;
}

export interface FileDisplayProps {
  file: any;
}

export interface BranchesSectionProps {
  branches: any[];
}

export interface IdentitySectionProps {
  formData: FormDataProps;
}

export interface InfoRowProps {
  label: string;
  value: any;
}

export interface ProfessionSectionProps {
  formData: FormDataProps;
}

export interface ProfileSectionProps {
  formData: FormDataProps;
  role?: string | null;
}

export interface SectionHeaderProps {
  title: string;
  onEdit?: () => void;
  isEditing?: boolean;
}

export interface SkillChipsProps {
  skills: string[];
}

export interface NavigationButtonProps {
  handleNavigation: (direction: "back" | "next") => void;
  navigateTo: "back" | "next";
  isDisabled?: boolean;
  bgColor?: string;
  textColor?: string;
  label: string;
}

export interface HeroHeaderProps {
  userRole: string | null;
}

export interface ProgressStepperProps {
  activeStep: number;
  steps: string[];
}

export interface KpiCardData {
  title: string;
  total: number | undefined;
  icon: React.ReactNode;
  iconBg: string; // Optional background color for the icon
}

export interface KpiCardProps {
  title: string;
  total: number;
  icon: React.ReactNode;
  iconBg: string; // Optional background color for the icon
}

export interface UserDashboardProps {
  role?: string;
  educatorId?: string;
  organizationId?: string;
  title?: string;
  description?: string;
}

export interface PageMetaProps {
  title?: string;
  description?: string;
}

export interface PageDescriptionProps {
  description: string;
}

export interface PageTitleProps {
  title: string;
}

export interface NavigationItem {
  text: string;
  to: string;
  icon: React.ComponentType;
  active: boolean;
}

export interface NavigationListProps {
  items: NavigationItem[];
  onItemClick: (index: number) => void;
}

export interface TextLinkProps {
  to: string;
  label: string;
}

export type RegisterVariables = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  role: string;
  toc: TOCVariant;
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

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  button1OnClick?: () => void;
  icon?: React.ReactElement;
  title: string;
  description: string;
  hasButton?: boolean;
  hasButton1?: boolean;
  buttonText?: string;
  button1Text?: string;
  additionalElements?: React.ReactNode;
  hasAdditionalElements?: boolean;
  hasTextarea?: boolean;
  textareaValue?: string;
  hasRating?: boolean;
  ratingValue?: number;
}

export interface Organization {
  organizationName: string;
  branches: Branch[];
}

export interface CalendarTabDataProps {
  _id: string;
  title: string;
  organization: Organization;
  branch: string;
  start: string;
  status: string;
}

export interface CalendarTabProps {
  calendarTabProps: CalendarTabDataProps[];
}

interface Mission {
  _id: string;
  title: string;
  organization: Organization;
  branch: string;
  start: string;
  end: string;
  status: string;
}
export interface MissionsTabsDataProps {
  missions: Mission[];
  status: string;
  refetchMissions: () => void;
}

export interface MissionsTabProps {
  missions: MissionsTabsDataProps[];
  refetchMissions: () => void;
}

interface Mission {
  id: string;
  title: string;
  organizationName: string;
  branchName: string;
  date: string;
  status: string;
}

export interface MissionsModalProps {
  open: boolean;
  onClose: () => void;
  date: string;
  missions: Mission[];
}

export interface MissionCardProps {
  _id: string;
  title: string;
  organizationName: string;
  branchName: string;
  date: string;
  time: string;
  branchAddress: string;
  status: string;
  refetch: () => void;
}

export interface KpiItem {
  title: string;
  total: number | undefined;
  icon: ReactElement;
  iconBg: string;
}

export interface CreateMissionModalProps {
  open: boolean;
  onClose: () => void;
  setFindEducatorData: (data: any) => void;
  setDataToSubmit: (data: any) => void;
}

export interface MarkerProps {
  position: {
    lng: number;
    lat: number;
  };
  name: string;
  skills: string[];
}
