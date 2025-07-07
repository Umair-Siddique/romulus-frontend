import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  useTheme,
  styled,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Upload,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";
import { useUserContext } from "#context";

interface CreateMissionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (missionData: any) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "700px", // Increased from 600px
    width: "100%",
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

const UploadArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: "8px",
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CreateMissionModal = ({
  open,
  onClose,
  onSubmit,
}: CreateMissionModalProps) => {
  const theme = useTheme();
  const { userProfile } = useUserContext();
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    skills: [] as string[],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    document: null as File | null,
  });

  const [newSkill, setNewSkill] = useState("");

  const branches = userProfile?.branches.map((branch: any) => ({
    name: branch.branchName,
    coordinates: branch.branchAddressCoordinates.coordinates,
  }));

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange("document", file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      branch: "",
      skills: [],
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: "",
      document: null,
    });
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Create Mission
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={3}>
          {/* Mission Title */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Mission Title
            </Typography>
            <TextField
              placeholder="Enter title"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(0.5),
                  backgroundColor: theme.palette.background.paper,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.light,
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.text.primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
              variant="outlined"
            />
          </Box>

          {/* Branch Selection */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Branch
            </Typography>
            <FormControl
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(0.5),
                  backgroundColor: theme.palette.background.paper,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.light,
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.text.primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
              fullWidth
            >
              <Select
                value={formData.branch}
                onChange={(e) => handleInputChange("branch", e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography color="text.disabled">
                        Select branch
                      </Typography>
                    );
                  }
                  return selected;
                }}
              >
                {branches.map((branch: any) => (
                  <MenuItem key={branch.name} value={branch.name}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Skills Section */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Add Skills
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add your skills (e.g., calmness, patience, concentration, report writing, teaching, sports practice)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(0.5),
                    backgroundColor: theme.palette.background.paper,
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
              <IconButton
                onClick={handleAddSkill}
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1) }}
            >
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillRemove(skill)}
                  deleteIcon={<CloseIcon />}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.text.primary,
                    fontSize: "0.875rem",
                    "& .MuiChip-deleteIcon": {
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Date Selection */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Date Range
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                placeholder="Start Date"
                type="date"
                fullWidth
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <CalendarToday sx={{ mr: 1, fontSize: 18 }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(0.5),
                    backgroundColor: theme.palette.background.paper,
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
              <TextField
                placeholder="End Date"
                type="date"
                fullWidth
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <CalendarToday sx={{ mr: 1, fontSize: 18 }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(0.5),
                    backgroundColor: theme.palette.background.paper,
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Time Selection */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Time Range
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                placeholder="From"
                type="time"
                fullWidth
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <AccessTime sx={{ mr: 1, fontSize: 18 }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(0.5),
                    backgroundColor: theme.palette.background.paper,
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
              <TextField
                placeholder="To"
                type="time"
                fullWidth
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <AccessTime sx={{ mr: 1, fontSize: 18 }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.spacing(0.5),
                    backgroundColor: theme.palette.background.paper,
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.light,
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Description */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Description
            </Typography>
            <TextField
              placeholder="Write here..."
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(0.5),
                  backgroundColor: theme.palette.background.paper,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.light,
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.text.primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* File Upload */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: theme.spacing(1),
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Upload Technical Document
            </Typography>
            <UploadArea
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload
                sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Upload Technical Document
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Accepted formats: JPG, PNG, PDF (Max: 5MB)
              </Typography>
              {formData.document && (
                <Typography variant="body2" color="primary" mt={1}>
                  Selected: {formData.document.name}
                </Typography>
              )}
            </UploadArea>
            <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            sx={{
              textTransform: "none",
              padding: theme.spacing(1, 2),
              fontSize: theme.typography.body2.fontSize,
              width: "30%",
              alignSelf: "center",
            }}
          >
            Find Educator
          </Button>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};
