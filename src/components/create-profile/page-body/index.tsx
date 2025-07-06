import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import { HeroHeader } from "./HeroHeader";
import { ProgressStepper } from "./ProgressStepper";
import { CreateProfileForm } from "./create-profile-form";

import { PageBodyProps } from "#types";

export const PageBody = ({ user }: PageBodyProps) => {
  const [steps, setSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const educatorSteps = [
      "Profile Setup",
      "Identity",
      "Profession",
      "Review & Submit",
    ];
    const organizationSteps = ["Profile Setup", "Review & Submit"];

    switch (role) {
      case "educator":
        setSteps(educatorSteps);
        break;
      case "organization":
        setSteps(organizationSteps);
        break;
      default:
        setSteps([]);
        break;
    }
  }, [role]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Hero Header */}
      <HeroHeader userRole={role} />

      {/* Progress Stepper */}
      <ProgressStepper activeStep={activeStep} steps={steps} />

      {/* CreateProfileForm Content */}
      <CreateProfileForm
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
        role={role}
        user={userData}
      />
    </Container>
  );
};
