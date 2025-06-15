import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Button, Paper } from "@mui/material";

import {
  PageHeader,
  ProgressStepper,
  EducatorSteps,
  FormHeader,
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

  const handleNavigation = (navigateTo: string) => {
    switch (navigateTo) {
      case "back":
        if (activeStep <= steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
        break;
      case "next":
        if (activeStep > 0) {
          setActiveStep(activeStep - 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <PageHeader />

      {/* Main Content */}
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
            <Button
              variant="contained"
              onClick={() => handleNavigation("back")}
              disabled={activeStep === 0}
              sx={{
                bgcolor: "#FFF",
                color: "black",
                px: 6,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#8da098",
                },
                "&:disabled": {
                  bgcolor: "#e0e0e0",
                  color: "#999",
                },
              }}
            >
              ← Back
            </Button>

            <Button
              variant="contained"
              onClick={() => handleNavigation("next")}
              disabled={activeStep === steps.length - 1}
              sx={{
                bgcolor: "#A1B7AF",
                color: "white",
                px: 6,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#8da098",
                },
                "&:disabled": {
                  bgcolor: "#e0e0e0",
                  color: "#999",
                },
              }}
            >
              Next →
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
