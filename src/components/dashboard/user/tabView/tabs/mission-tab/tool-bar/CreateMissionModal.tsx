import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  Close,
  Add,
  Upload,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";

interface CreateMissionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (missionData: any) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "600px",
    width: "100%",
    margin: theme.spacing(2),
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

  const branches = ["Downtown", "Uptown", "Midtown"];
  const commonSkills = [
    "Math",
    "Science",
    "Language Teaching",
    "Programming",
    "Physics",
    "Chemistry",
  ];

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

  const handleRemoveSkill = (skillToRemove: string) => {
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
        <Typography variant="h6" fontWeight={600}>
          Create Mission
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Stack spacing={3}>
          {/* Mission Title */}
          <TextField
            label="Mission Title"
            placeholder="Enter title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            variant="outlined"
          />

          {/* Branch Selection */}
          <FormControl fullWidth>
            <InputLabel>Branch</InputLabel>
            <Select
              value={formData.branch}
              onChange={(e) => handleInputChange("branch", e.target.value)}
              label="Branch"
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Skills Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Add Skills
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TextField
                placeholder="Add your skills (e.g., Math, Science, Programming, Language Teaching)"
                fullWidth
                size="small"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
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
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* Date Selection */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, fontSize: 18 }} />,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, fontSize: 18 }} />,
              }}
            />
          </Stack>

          {/* Time Selection */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="From"
              type="time"
              fullWidth
              value={formData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <AccessTime sx={{ mr: 1, fontSize: 18 }} />,
              }}
            />
            <TextField
              label="To"
              type="time"
              fullWidth
              value={formData.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <AccessTime sx={{ mr: 1, fontSize: 18 }} />,
              }}
            />
          </Stack>

          {/* Description */}
          <TextField
            label="Description"
            placeholder="Write here..."
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          {/* File Upload */}
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
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
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: theme.palette.info.main,
              color: "white",
              textTransform: "none",
              py: 1.5,
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.info.dark,
              },
            }}
          >
            Find Educator
          </Button>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};
