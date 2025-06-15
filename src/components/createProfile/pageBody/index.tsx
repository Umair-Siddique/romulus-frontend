import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { HeroHeader } from "./heroHeader";
import { ProgressStepper } from "./progressStepper";
import { Form } from "./form";

interface PageBodyProps {
  role: string | null;
}

export const PageBody = ({ role }: PageBodyProps) => {
  const [steps, setSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

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
  }, []);

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
      />
    </Container>
  );
};
