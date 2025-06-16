import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  PhotoCamera as CameraIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Description as FileIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "file" | "select" | "date" | "tel" | "number" | "email";
  required: boolean;
  options?: string[];
}

interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (event: any) => {
    const newValue =
      field.type === "file" ? event.target.files?.[0] : event.target.value;
    onChange(field.name, newValue);
  };

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      const currentItems = Array.isArray(value) ? value : [];
      onChange(field.name, [...currentItems, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (itemToRemove: string) => {
    const currentItems = Array.isArray(value) ? value : [];
    onChange(
      field.name,
      currentItems.filter((item) => item !== itemToRemove)
    );
  };

  const renderField = () => {
    // Profile Picture Upload
    if (field.name === "profilePicture") {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                border: "3px solid #4A90E2",
                cursor: "pointer",
              }}
              src={value ? URL.createObjectURL(value) : undefined}
            >
              <CameraIcon sx={{ fontSize: 40, color: "#666" }} />
            </Avatar>
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#4A90E2",
                color: "white",
                width: 32,
                height: 32,
                "&:hover": { backgroundColor: "#357ABD" },
              }}
            >
              <CameraIcon sx={{ fontSize: 16 }} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleChange}
              />
            </IconButton>
          </Box>
        </Box>
      );
    }

    // Skills with tags
    if (field.name === "skills") {
      const skills = Array.isArray(value) ? value : [];
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Add Skills {field.required && "*"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Add your skills (e.g., calmness, patience, concentration, report writing, teaching, sports practice, )"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <IconButton
              onClick={handleSkillAdd}
              sx={{ ml: 1, backgroundColor: "#f5f5f5" }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill: string, index: number) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleSkillRemove(skill)}
                deleteIcon={<CloseIcon />}
                sx={{ backgroundColor: "#E3F2FD" }}
              />
            ))}
          </Box>
        </Box>
      );
    }

    // File Upload
    if (field.type === "file") {
      const getFileUploadContent = () => {
        if (field.name === "identityProof") {
          return {
            title: "Upload government-issued ID",
            subtitle: "(Passport, Driver's License, National ID Card)",
          };
        }
        if (field.name === "criminalRecord") {
          return {
            title: "Upload your Criminal Record B3",
            subtitle: "(Police clearance or background check document)",
          };
        }
        if (field.name === "certificateOfOwner") {
          return {
            title: "Upload Certificate of Honorability",
            subtitle: "",
          };
        }
        if (field.name === "diploma") {
          return {
            title: "Upload Certificate/Diploma",
            subtitle: "",
          };
        }
        return {
          title: `Upload ${field.label}`,
          subtitle: "",
        };
      };

      const { title, subtitle } = getFileUploadContent();

      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label} {!field.required && "(Optional)"}
          </Typography>

          {value ? (
            <Box
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F8F9FA",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FileIcon sx={{ color: "#4A90E2", mr: 1 }} />
                <Typography>{value.name}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => onChange(field.name, null)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Box
                component="label"
                sx={{
                  border: "2px dashed #D1D5DB",
                  borderRadius: "8px",
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#FAFAFA",
                  display: "block",
                  "&:hover": {
                    borderColor: "#4A90E2",
                    backgroundColor: "#F0F8FF",
                  },
                }}
              >
                <UploadIcon sx={{ fontSize: 48, color: "#9CA3AF", mb: 1 }} />
                <Typography variant="body1" sx={{ color: "#6B7280", mb: 0.5 }}>
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="body2" sx={{ color: "#9CA3AF", mb: 1 }}>
                    {subtitle}
                  </Typography>
                )}
                <input
                  type="file"
                  hidden
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "#9CA3AF", mt: 1, display: "block" }}
              >
                Accepted formats: JPG, PNG, PDF (Max: 5MB)
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    // Select dropdown
    if (field.type === "select") {
      return (
        <FormControl fullWidth>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label} {field.required && "*"}
          </Typography>
          <Select
            value={value || ""}
            onChange={handleChange}
            displayEmpty
            sx={{
              borderRadius: "8px",
              "& .MuiSelect-select": {
                py: 1.5,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select {field.label.toLowerCase()}
            </MenuItem>
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // Date input
    if (field.type === "date") {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            {field.label} {field.required && "*"}
          </Typography>
          <TextField
            fullWidth
            type="date"
            value={value || ""}
            onChange={handleChange}
            placeholder="Select your date of birth"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarIcon sx={{ color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Box>
      );
    }

    // Number input (hourly rate)
    if (field.type === "number" && field.name === "hourlyRate") {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Your Hourly Rate {field.required && "*"}
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={value || ""}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ color: "#666" }}>€</Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Box>
      );
    }

    // Default text input
    return (
      <Box>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
          {field.label} {field.required && "*"}{" "}
          {!field.required && "(Optional)"}
        </Typography>
        <TextField
          fullWidth
          type={field.type}
          value={value || ""}
          onChange={handleChange}
          placeholder={`Enter your ${field.label.toLowerCase()}`}
          multiline={field.name === "bio" || field.name === "fullAddress"}
          rows={field.name === "bio" ? 4 : field.name === "fullAddress" ? 2 : 1}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </Box>
    );
  };

  return <Box sx={{ mb: 3 }}>{renderField()}</Box>;
};
