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
  confirmPassword?: string;
  phone?: string;
  role: string;
  toc: boolean | undefined;
};

export const RegisterPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [userRole, setUserRole] = useState("");

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "",
      toc: false,
    },
  });

  const { mutate: signup, isLoading } = useRegister<RegisterVariables>();

  const onSubmit = async (data: RegisterVariables) => {
    signup(
      {
        ...data,
        role: userRole,
        confirmPassword: undefined,
        toc: undefined,
      },
      {
        onSuccess: () => {
          form.reset();
          setFormStep(3);
        },
        onError: (error) => {
          console.error("Error during registration:", error);
        },
      }
    );
  };

  const getFormFields = () => {
    const commonFieldProps = {
      register: form.register,
      errors: form.formState.errors,
    };

    if (formStep === 1) {
      return [
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
          validationRules: validationRules.role,
          ...commonFieldProps,
        },
      ];
    } else if (formStep === 2) {
      const baseFields = [
        {
          label: "First Name",
          type: "text",
          name: "firstName",
          placeholder: "Enter your first name",
          validationRules: validationRules.firstName,
        },
        {
          label: "Last Name",
          type: "text",
          name: "lastName",
          placeholder: "Enter your last name",
          validationRules: validationRules.lastName,
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter your email address",
          validationRules: validationRules.email,
        },
      ];

      if (userRole === "educator") {
        baseFields.push({
          label: "WhatsApp Number",
          type: "tel",
          name: "phone",
          placeholder: "Enter your WhatsApp number",
          validationRules: validationRules.phone,
        });
      }

      baseFields.push(
        {
          label: "Password",
          type: "password",
          name: "password",
          placeholder: "Enter your password",
          validationRules: validationRules.password,
        },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          placeholder: "Re-enter your password",
          validationRules: validationRules.confirmPassword,
        },
        {
          label: "I agree to the Terms and Conditions",
          type: "checkbox",
          name: "toc",
          placeholder: "",
          validationRules: validationRules.toc,
        }
      );
      return baseFields.map((field) => ({ ...field, ...commonFieldProps }));
    } else if (formStep === 3) {
      return [
        {
          label: "Verification Code",
          type: "text",
          name: "verificationCode",
          placeholder: "",
          validationRules: validationRules.verificationCode,
          ...commonFieldProps,
        },
      ];
    }

    return [];
  };

  const getFormConfig = () => {
    if (formStep === 1) {
      return {
        title: "Select Your User Type",
        description:
          "Choose your role to proceed with the registration or login process.",
        showSubmitButton: false,
      };
    } else if (formStep === 2) {
      return {
        title: "Create Your Account",
        description: "Fill in your details to sign up.",
        showSubmitButton: true,
        bottomContent: (
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
        ),
        submitLoadingText: "Signing up...",
        submitLabel: "Sign Up",
      };
    } else {
      return {
        title: "Check your WhatsApp number",
        description:
          "Enter the 6-digit code sent to your WhatsApp (+92 3XXXXXXXXX) to verify your number.",
        bottomContent: (
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
            Didn't receive a code?{" "}
            <Typography
              sx={{
                color: "#A1B7AF",
                textDecoration: "none",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                fontFamily: "montserrat, sans-serif",
                fontSize: "14px",
              }}
            >
              Request again.
            </Typography>
          </Typography>
        ),
      };
    }
  };

  const formConfig = getFormConfig();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <Form
        formTitle={formConfig.title}
        formDescription={formConfig.description}
        formfields={getFormFields()}
        formType="register"
        formStep={formStep}
        setFormStep={setFormStep}
        setUserRole={setUserRole}
        isLoading={isLoading}
        bottomTextWithLink={formConfig.bottomContent}
        submitLoadingText={formConfig.submitLoadingText}
        submitLabel={formConfig.submitLabel}
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
      />

      <AuthBackground backgroundImage={AuthBg} />
    </Box>
  );
};
