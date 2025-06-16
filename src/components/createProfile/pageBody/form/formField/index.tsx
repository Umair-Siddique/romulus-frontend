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
  Add as AddIcon,
  Close as CloseIcon,
  Description as FileIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  CameraAlt as CameraIcon,
  KeyboardArrowDown as ArrowDownIcon,
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

  const inputFocusStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#F8FAF9",
      "& fieldset": {
        borderWidth: 0,
      },
      "&:hover fieldset": {
        borderWidth: 0,
      },
      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#A1B7AF",
      },
      // Add this to remove blue outline
      "&.Mui-focused": {
        outline: "none",
      },
    },
  };

  const selectFocusStyles = {
    borderRadius: "8px",
    backgroundColor: "#F8FAF9",
    "& .MuiSelect-select": {
      py: 1.5,
    },
    "& fieldset": {
      borderWidth: 0,
    },
    "&:hover fieldset": {
      borderWidth: 0,
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#A1B7AF",
    },
    // More specific targeting for Select focus styles
    "&.Mui-focused": {
      outline: "none !important",
      boxShadow: "none !important",
    },
    "& .MuiSelect-select.Mui-focused": {
      outline: "none !important",
      boxShadow: "none !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "&:focus-within": {
      outline: "none !important",
      boxShadow: "none !important",
    },
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
                backgroundColor: "#E8F0EC",
                border: "3px solid #A1B7AF",
                cursor: "pointer",
              }}
              src={value ? URL.createObjectURL(value) : undefined}
            >
              <PersonIcon sx={{ fontSize: 40, color: "#7A8B84" }} />
            </Avatar>
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#A1B7AF",
                color: "white",
                width: 32,
                height: 32,
                "&:hover": { backgroundColor: "#8A9D95" },
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
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
          >
            Add Skills {field.required && "*"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Add your skills (e.g., calmness, patience, concentration, report writing, teaching, sports practice, )"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
              sx={inputFocusStyles}
            />
            <IconButton
              onClick={handleSkillAdd}
              sx={{
                ml: 1,
                backgroundColor: "#E8F0EC",
                color: "#A1B7AF",
                "&:hover": {
                  backgroundColor: "#D4E0DC",
                },
              }}
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
                sx={{
                  backgroundColor: "#E8F0EC",
                  color: "#3B4B44",
                  "& .MuiChip-deleteIcon": {
                    color: "#7A8B84",
                    "&:hover": {
                      color: "#A1B7AF",
                    },
                  },
                }}
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
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
          >
            {field.label} {!field.required && "(Optional)"}
          </Typography>

          {value ? (
            <Box
              sx={{
                border: "1px solid #D4E0DC",
                borderRadius: "8px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F8FAF9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FileIcon sx={{ color: "#A1B7AF", mr: 1 }} />
                <Typography sx={{ color: "#3B4B44" }}>{value.name}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => onChange(field.name, null)}
                sx={{
                  color: "#7A8B84",
                  "&:hover": {
                    color: "#A1B7AF",
                    backgroundColor: "#E8F0EC",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Box
                component="label"
                sx={{
                  border: "2px dashed #C1CCC5",
                  borderRadius: "8px",
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#F8FAF9",
                  display: "block",
                  "&:hover": {
                    borderColor: "#A1B7AF",
                    backgroundColor: "#E8F0EC",
                  },
                }}
              >
                <UploadIcon sx={{ fontSize: 48, color: "#7A8B84", mb: 1 }} />
                <Typography variant="body1" sx={{ color: "#3B4B44", mb: 0.5 }}>
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="body2" sx={{ color: "#7A8B84", mb: 1 }}>
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
                sx={{ color: "#7A8B84", mt: 1, display: "block" }}
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
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
          >
            {field.label} {field.required && "*"}
          </Typography>
          <Select
            value={value || ""}
            onChange={handleChange}
            displayEmpty
            IconComponent={ArrowDownIcon}
            sx={{
              ...selectFocusStyles,
              "& .MuiSelect-icon": {
                color: "#7A8B84",
              },
              color: "#3B4B44",
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
    // Date input
    if (field.type === "date") {
      return (
        <Box>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
          >
            {field.label} {field.required && "*"}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              type="date"
              value={value || ""}
              onChange={handleChange}
              placeholder="Select your date of birth"
              sx={{
                ...inputFocusStyles,
                "& .MuiInputBase-input": {
                  color: "#3B4B44",
                },
                // Hide the default calendar icon
                "& input[type='date']::-webkit-calendar-picker-indicator": {
                  opacity: 0,
                  position: "absolute",
                  right: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                },
                "& input[type='date']": {
                  paddingRight: "40px", // Make space for custom icon
                },
              }}
            />
            <CalendarIcon
              sx={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#7A8B84",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
      );
    }

    // Number input (hourly rate)
    if (field.type === "number" && field.name === "hourlyRate") {
      return (
        <Box>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
          >
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
                  <Typography sx={{ color: "#7A8B84" }}>€</Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              ...inputFocusStyles,
              "& .MuiInputBase-input": {
                color: "#3B4B44",
              },
            }}
          />
        </Box>
      );
    }

    // Default text input
    return (
      <Box>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontWeight: 500, color: "#3B4B44" }}
        >
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
            ...inputFocusStyles,
            "& .MuiInputBase-input": {
              color: "#3B4B44",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#7A8B84",
              opacity: 1,
            },
          }}
        />
      </Box>
    );
  };

  return <Box sx={{ mb: 3 }}>{renderField()}</Box>;
};
