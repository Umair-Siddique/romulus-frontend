import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container } from "@mui/material";

import {
  PageHeader,
  ProgressStepper,
  HeroHeader,
  Form,
} from "../../../components/createProfile";

export const CreateProfile = () => {
  const [role, setRole] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    // If not logged in, redirect to login page
    const user = localStorage.getItem("romulus-user");
    const isLoggedIn = Boolean(user);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Check if the user has already created a profile
    // If yes, redirect to the dashboard
    const profile = localStorage.getItem("has-profile");
    const hasProfile = Boolean(profile);

    if (!hasProfile) {
      navigate("/");
      return;
    }

    // Determine the steps based on user role
    const parsedUser = user ? JSON.parse(user) : null;
    const userRole = parsedUser?.role;

    setRole(userRole);

    const educatorSteps = [
      "Profile Setup",
      "Identity",
      "Profession",
      "Review & Submit",
    ];
    const organizationSteps = ["Profile Setup", "Review & Submit"];

    switch (userRole) {
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
  }, [navigate]);

  return (
    <Box>
      {/* Page Header */}
      <PageHeader />

      {/* Main Content */}
      {steps.length > 0 && (
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
      )}
    </Box>
  );
};
