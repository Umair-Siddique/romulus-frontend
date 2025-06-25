import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";

import { Form } from "./form";
import { HeroHeader } from "./heroHeader";
import { ProgressStepper } from "./progressStepper";

interface PageBodyProps {
  user: any | null;
}

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

      {/* Form Content */}
      <Form
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
        role={role}
        user={userData}
      />
    </Container>
  );
};
