import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useRegister } from "@refinedev/core";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";

import { validationRules } from "../../../constants/validation";
import { AuthBackground, Form } from "../../../components/auth";
import AuthBg from "../../../assets/images/auth-bg.jpg";
import TextLink from "../../../components/textLink";

type RegisterVariables = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  toc: boolean;
};

export const RegisterPage = () => {
  const [formStep, setFormStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      toc: false,
    },
  });

  const { mutate: signup, isLoading } = useRegister<RegisterVariables>();

  const onSubmit = async (data: RegisterVariables) => {
    signup(data);
  };

  const stepOneFormFields = [
    {
      label: "Role",
      type: "radio",
      name: "role",
      options: [
        {
          title: "I'm Educator",
          description:
            "I am an educator looking to join as a member of this platform to engage with tasks and missions.",
          value: "educator",
          icon: <PersonIcon />,
        },
        {
          title: "I'm Organization",
          description:
            "I am an organization that creates tasks and invites educators to participate in them.",
          value: "organization",
          icon: <CorporateFareIcon />,
        },
      ],
      register,
      errors,
      validationRules: validationRules.role,
    },
  ];

  const stepTwoFormFields = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      placeholder: "Enter your first name",
      register,
      errors,
      validationRules: validationRules.firstName,
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Enter your last name",
      register,
      errors,
      validationRules: validationRules.lastName,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      register,
      errors,
      validationRules: validationRules.email,
    },
    {
      label: "Phone Number",
      type: "tel",
      name: "phone",
      placeholder: "Enter your phone number (optional)",
      register,
      errors,
      validationRules: validationRules.phone,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      register,
      errors,
      validationRules: validationRules.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Re-enter your password",
      register,
      errors,
      validationRules: validationRules.confirmPassword,
    },
    {
      label: "I agree to the Terms and Conditions",
      type: "checkbox",
      name: "toc",
      register,
      errors,
      validationRules: validationRules.required,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Side - Form */}
      {formStep === 1 ? (
        <Form
          formTitle="Select Your User Type"
          formDescription="Choose your role to proceed with the registration or login process."
          formfields={stepOneFormFields}
          formType="register"
          formStep={formStep}
          setFormStep={setFormStep}
        />
      ) : (
        formStep === 2 && (
          <Form
            formTitle="Create Your Account"
            formDescription="Fill in your details to sign up."
            formfields={stepTwoFormFields}
            formType="register"
            isLoading={isLoading}
            bottomTextWithLink={
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  fontFamily: "inter, sans-serif",
                }}
              >
                Already have an account? <TextLink to="/login" label="Login" />
              </Typography>
            }
            submitLoadingText="Signing up..."
            submitLabel="Sign Up"
            setFormStep={setFormStep}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )
      )}

      {/* Right Side - Image with Overlay Text */}
      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
