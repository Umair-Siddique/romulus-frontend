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
    const profile = localStorage.getItem("has-profile");
    const parsedProfile = profile ? JSON.parse(profile) : null;
    const hasProfile = parsedProfile === true || parsedProfile === "true";

    if (hasProfile) {
      navigate("/");
      return;
    }

    const user = localStorage.getItem("romulus-user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!user) {
      navigate("/login");
      return;
    }

    const userRole = parsedUser?.role;
    if (userRole) {
      setRole(userRole);
    }

    const educatorSteps = [
      "Profile Setup",
      "Identity",
      "Profession",
      "Review & Submit",
    ];
    const organizationSteps = ["Organization Details", "Review & Submit"];

    if (userRole === "educator") {
      setSteps(educatorSteps);
    } else {
      setSteps(organizationSteps);
    }
  }, [navigate]);

  const handleNext = () => {
    if (activeStep <= steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
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
              onClick={handleBack}
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
              onClick={handleNext}
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
