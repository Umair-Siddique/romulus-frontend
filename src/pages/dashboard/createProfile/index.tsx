import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";

const profile = localStorage.getItem("has-profile");
const steps = ["Profile Setup", "Identity", "Profession", "Review & Submit"];

export const CreateProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const hasProfile = profile ? Boolean(profile) : false;

  const navigate = useNavigate();

  useEffect(() => {
    !hasProfile && navigate("/create-profile");
  }, []);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Custom styles
  const primaryColor = "#A1B7AF";

  const textFieldStyle = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: primaryColor,
    },
  };

  const selectStyle = {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: primaryColor,
    },
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            {/* Profile Picture */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#f5f5f5",
                    border: `3px solid ${primaryColor}`,
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#999">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: primaryColor,
                    color: "white",
                    width: 32,
                    height: 32,
                    "&:hover": { bgcolor: "#8da098" },
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 2C7.9 2 7 2.9 7 4v1H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1.8c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2S8.8 10.23 8.8 12s1.43 3.2 3.2 3.2z" />
                  </svg>
                </IconButton>
              </Box>
            </Box>

            {/* Form Fields */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter your first name"
                  required
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Enter your last name"
                  required
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select label="Gender" displayEmpty sx={selectStyle}>
                    <MenuItem value="">Select your gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select label="City" displayEmpty sx={selectStyle}>
                    <MenuItem value="">Select city</MenuItem>
                    <MenuItem value="new-york">New York</MenuItem>
                    <MenuItem value="london">London</MenuItem>
                    <MenuItem value="tokyo">Tokyo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select label="Country" displayEmpty sx={selectStyle}>
                    <MenuItem value="">Select country</MenuItem>
                    <MenuItem value="us">United States</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                    <MenuItem value="jp">Japan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Address"
                  placeholder="Enter full address"
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio (Optional)"
                  placeholder="Write here..."
                  multiline
                  rows={4}
                  sx={textFieldStyle}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4, textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              Identity Step Content
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4, textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              Profession Step Content
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 4, textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              Review & Submit Step Content
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Hi John, let's complete
        </Typography>
        <Typography variant="h4" fontWeight="600">
          your profile
        </Typography>
      </Box>

      {/* Progress Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-root .Mui-completed": {
              color: primaryColor,
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: primaryColor,
            },
            "& .MuiStepConnector-line": {
              borderColor: "#e0e0e0",
            },
            "& .Mui-completed .MuiStepConnector-line": {
              borderColor: primaryColor,
            },
            "& .Mui-active .MuiStepConnector-line": {
              borderColor: primaryColor,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Form Content */}
      <Paper
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          p: 4,
          minHeight: 500,
        }}
      >
        {renderStepContent(activeStep)}

        {/* Navigation Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            sx={{
              bgcolor: primaryColor,
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
  );
};
