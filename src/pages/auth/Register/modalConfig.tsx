import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

export const getModalConfig = (
  form: any,
  setFormStep: any,
  formStep: number,
  userRole: string,
  setShowModal: any
) => {
  const navigate = useNavigate();

  if (formStep === 2) {
    if (userRole === "organization") {
      return {
        open: true,
        icon: <GridCheckCircleIcon />,
        onClose: () => setShowModal(false),
        onSubmit: () => navigate("/login"),
        title: "Account created successfully!",
        description:
          "You're almost there! Signin to complete your profile and upload your ID documents to get started.",
        buttonText: "Sign In Now",
      };
    } else {
      return {
        open: true,
        icon: <GridCheckCircleIcon />,
        onClose: () => setShowModal(false),
        onSubmit: () => {
          form.reset();
          setShowModal(false);
          setFormStep(3);
        },
        title: "Account created successfully!",
        description:
          "Your educator account is ready. Check your email for the verification link and WhatsApp for the code.",
        buttonText: "Continue to enter code",
      };
    }
  } else {
    return {
      open: true,
      icon: <GridCheckCircleIcon />,
      onClose: () => setShowModal(false),
      onSubmit: () => setFormStep(3),
      title: "TITLE",
      description: "DESCRIPTION",
      buttonText: "BUTTON TEXT",
    };
  }
};
