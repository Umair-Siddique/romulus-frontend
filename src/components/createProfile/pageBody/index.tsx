import React from "react";
import { Container } from "@mui/material";
import { HeroHeader } from "../heroHeader";
import { ProgressStepper } from "../progressStepper";
import { Form } from "../form";

interface PageBodyProps {
  role: string | null;
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const PageBody = ({
  role,
  steps,
  activeStep,
  setActiveStep,
}: PageBodyProps) => {
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
      />
    </Container>
  );
};
