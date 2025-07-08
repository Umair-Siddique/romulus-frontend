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
} from "@mui/icons-material";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";
import { httpClient } from "#utils";
import { CreateMissionModalProps, FormDataProps } from "#types";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "700px",
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
}: CreateMissionModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userProfile } = useUserContext();
  const [newSkill, setNewSkill] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      branch: "",
      skills: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: "",
      technicalDocument: undefined,
    },
  });

  const organizationId = userProfile?._id;

  const watchedValues = watch();

  const branches = userProfile?.branches.map((branch: any) => ({
    name: branch.branchName,
    coordinates: branch.branchAddressCoordinates.coordinates,
  }));

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsArray.includes(newSkill.trim())) {
      const updatedSkills = [...skillsArray, newSkill.trim()];
      setSkillsArray(updatedSkills);
      setValue("skills", updatedSkills.join(", "), { shouldValidate: true });
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const updatedSkills = skillsArray.filter(
      (skill) => skill !== skillToRemove
    );
    setSkillsArray(updatedSkills);
    setValue("skills", updatedSkills.join(", "), { shouldValidate: true });
  };

  const onFormSubmit = async (data: FormDataProps) => {
    try {
      const formData = new FormData();
      const branchCoordinates = branches.find(
        (branch: any) => branch.name === data.branch
      )?.coordinates;

      // Append all form fields
      formData.append("title", data.title);
      formData.append("branch", data.branch);
      formData.append("skills", data.skills);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("description", data.description);
      formData.append("organization", organizationId || "");

      // Append file if selected - use the file from form data
      if (data.technicalDocument && data.technicalDocument.length > 0) {
        formData.append("technicalDocument", data.technicalDocument[0]);
      }

      await httpClient.post("/missions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/find-educator", {
        state: { coordinates: branchCoordinates, skills: skillsArray },
      });

      handleClose();
    } catch (error) {
      console.error("Error creating mission:", error);
      // Handle error appropriately - maybe show a toast notification
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setSelectedDocument(null);
    setNewSkill("");
    setSkillsArray([]);
  };

  // Check if all required fields are filled
  const isFormValid =
    isValid &&
    watchedValues.title &&
    watchedValues.branch &&
    skillsArray.length > 0 &&
    watchedValues.startDate &&
    watchedValues.endDate &&
    watchedValues.startTime &&
    watchedValues.endTime &&
    watchedValues.description;

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth>
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
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
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
                Mission Title *
              </Typography>
              <TextField
                placeholder="Enter title"
                fullWidth
                error={!!errors.title}
                helperText={
                  typeof errors.title?.message === "string"
                    ? errors.title.message
                    : undefined
                }
                {...register("title", {
                  required: "Mission title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                })}
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
                Branch *
              </Typography>
              <FormControl
                fullWidth
                error={!!errors.branch}
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
                }}
              >
                <Select
                  displayEmpty
                  {...register("branch", {
                    required: "Branch selection is required",
                  })}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography color="text.disabled">
                          Select branch
                        </Typography>
                      );
                    }
                    return typeof selected === "string"
                      ? selected
                      : String(selected);
                  }}
                >
                  {branches?.map((branch: any) => (
                    <MenuItem key={branch.name} value={branch.name}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.branch && typeof errors.branch.message === "string" && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.branch.message}
                  </Typography>
                )}
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
                Add Skills *
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
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
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(1),
                }}
              >
                {skillsArray.map((skill: string, index: number) => (
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
              {errors.skills && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  {errors.skills.message}
                </Typography>
              )}
            </Box>

            {/* Date Selection */}
            <Box>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: theme.spacing(1),
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Start Date *
                  </Typography>
                  <TextField
                    placeholder="Start Date"
                    type="date"
                    fullWidth
                    error={!!errors.startDate}
                    helperText={
                      typeof errors.startDate?.message === "string"
                        ? errors.startDate.message
                        : undefined
                    }
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    InputLabelProps={{ shrink: true }}
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
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: theme.spacing(1),
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    End Date *
                  </Typography>
                  <TextField
                    placeholder="End Date"
                    type="date"
                    fullWidth
                    error={!!errors.endDate}
                    helperText={
                      typeof errors.endDate?.message === "string"
                        ? errors.endDate.message
                        : undefined
                    }
                    {...register("endDate", {
                      required: "End date is required",
                      validate: (value) => {
                        if (
                          watchedValues.startDate &&
                          value < watchedValues.startDate
                        ) {
                          return "End date must be after start date";
                        }
                        return true;
                      },
                    })}
                    InputLabelProps={{ shrink: true }}
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
                    }}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Time Selection */}
            <Box>
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: theme.spacing(1),
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Start Time *
                  </Typography>
                  <TextField
                    placeholder="Start Time"
                    type="time"
                    fullWidth
                    error={!!errors.startTime}
                    helperText={
                      typeof errors.startTime?.message === "string"
                        ? errors.startTime.message
                        : undefined
                    }
                    {...register("startTime", {
                      required: "Start time is required",
                    })}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // 5 minutes interval
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
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: theme.spacing(1),
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                    }}
                  >
                    End Time *
                  </Typography>
                  <TextField
                    placeholder="End Time"
                    type="time"
                    fullWidth
                    error={!!errors.endTime}
                    helperText={
                      typeof errors.endTime?.message === "string"
                        ? errors.endTime.message
                        : undefined
                    }
                    {...register("endTime", {
                      required: "End time is required",
                      validate: (value) => {
                        if (
                          watchedValues.startTime &&
                          watchedValues.startDate === watchedValues.endDate &&
                          value <= watchedValues.startTime
                        ) {
                          return "End time must be after start time on the same day";
                        }
                        return true;
                      },
                    })}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      step: 300, // 5 minutes interval
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
                    }}
                  />
                </Box>
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
                Description *
              </Typography>
              <TextField
                placeholder="Write here..."
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={
                  typeof errors.description?.message === "string"
                    ? errors.description.message
                    : undefined
                }
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long",
                  },
                })}
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
                {selectedDocument && (
                  <Typography variant="body2" color="default" mt={1}>
                    Selected: {selectedDocument.name}
                  </Typography>
                )}
              </UploadArea>
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                // onChange={handleFileUpload}
                style={{ display: "none" }}
                {...register("technicalDocument")}
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid}
              sx={{
                textTransform: "none",
                padding: theme.spacing(1, 2),
                fontSize: theme.typography.body2.fontSize,
                width: "30%",
                alignSelf: "center",
                opacity: isFormValid ? 1 : 0.6,
                "&:disabled": {
                  backgroundColor: theme.palette.grey[400],
                  color: theme.palette.grey[600],
                },
              }}
            >
              Find Educator
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};
