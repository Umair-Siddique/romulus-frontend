import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Paper } from "@mui/material";

import {
  PageHeader,
  ProgressStepper,
  EducatorSteps,
  FormHeader,
} from "../../../components/createProfile";
import { NavigationButton } from "../../../components/createProfile/navigationButtons";

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

  const handleNavigation = (navigateTo: string) => {
    switch (navigateTo) {
      case "next":
        if (activeStep < steps.length - 1) {
          setActiveStep((prev) => prev + 1);
        }
        break;
      case "back":
        if (activeStep > 0) {
          setActiveStep((prev) => prev - 1);
        }
        break;
      default:
        break;
    }
  };

  const navigationButtonsConfig: {
    navigateTo: "back" | "next";
    isDisabled: boolean;
    bgColor: string;
    textColor: string;
    label: string;
  }[] = [
    {
      navigateTo: "back",
      isDisabled: activeStep === 0,
      bgColor: "#FFF",
      textColor: "black",
      label: "← Back",
    },
    {
      navigateTo: "next",
      isDisabled: activeStep === steps.length - 1,
      bgColor: "#A1B7AF",
      textColor: "white",
      label: "Next →",
    },
  ];

  return (
    <Box>
      {/* Page Header */}
      <PageHeader />

      {/* Main Content */}
      {steps.length > 0 && (
        <Container maxWidth="md" sx={{ py: 4 }}>
          {/* Form Header */}
          <FormHeader userRole={role} />

          {/* Progress Stepper */}
          <ProgressStepper activeStep={activeStep} steps={steps} />

          {/* Form Content */}
          <Paper
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              p: 4,
              minHeight: 500,
            }}
          >
            <EducatorSteps activeStep={activeStep} />

            {/* Navigation Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              {navigationButtonsConfig.map((buttonConfig) => (
                <NavigationButton
                  key={buttonConfig.navigateTo}
                  handleNavigation={handleNavigation}
                  navigateTo={buttonConfig.navigateTo}
                  isDisabled={buttonConfig.isDisabled}
                  bgColor={buttonConfig.bgColor}
                  textColor={buttonConfig.textColor}
                  label={buttonConfig.label}
                />
              ))}
            </Box>
          </Paper>
        </Container>
      )}
    </Box>
  );
};
