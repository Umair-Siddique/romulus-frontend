import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { cities, countries, truncateWithEllipsis } from "#lib";

export const BranchModal = ({
  open,
  onClose,
  onSave,
  editBranch,
  editIndex,
  existingData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (branchData: any, editIndex: number) => void;
  editBranch?: any;
  editIndex?: number | undefined;
  existingData?: any;
}) => {
  const theme = useTheme<Theme>();

  const [branchData, setBranchData] = useState<{
    branchName: string;
    branchEmail: string;
    branchPhone: string;
    branchCity: string;
    branchCountry: string;
    branchAddress: string;
    residenceGuidelines: File | null | string;
  }>({
    branchName: "",
    branchEmail: "",
    branchPhone: "",
    branchCity: "",
    branchCountry: "",
    branchAddress: "",
    residenceGuidelines: null,
  });

  // Pre-populate form when editing
  useEffect(() => {
    if (editBranch && open) {
      setBranchData({
        branchName: editBranch.branchName || "",
        branchEmail: editBranch.branchEmail || "",
        branchPhone: editBranch.branchPhone || "",
        branchCity: editBranch.branchCity || "",
        branchCountry: editBranch.branchCountry || "",
        branchAddress: editBranch.branchAddress || "",
        residenceGuidelines: editBranch.residenceGuidelines || null,
      });
    } else if (!editBranch && open) {
      // Reset form for adding new branch
      setBranchData({
        branchName: "",
        branchEmail: "",
        branchPhone: "",
        branchCity: "",
        branchCountry: "",
        branchAddress: "",
        residenceGuidelines: null,
      });
    }

    if (existingData && open) {
      setBranchData({
        branchName: existingData?.name || "",
        branchEmail: existingData?.email || "",
        branchPhone: existingData?.phone || "",
        branchCity: existingData?.city || "",
        branchCountry: existingData?.country || "",
        branchAddress: existingData?.address || "",
        residenceGuidelines:
          truncateWithEllipsis(existingData?.residenceGuidelines) || null,
      });
    }
  }, [editBranch, open]);

  const handleChange = (field: string, value: any) => {
    setBranchData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !branchData.branchName ||
      !branchData.branchEmail ||
      !branchData.branchPhone ||
      !branchData.branchCity ||
      !branchData.branchCountry ||
      !branchData.branchAddress
    ) {
      return;
    }

    onSave(branchData, editIndex || 0);

    onClose();

    setBranchData({
      branchName: "",
      branchEmail: "",
      branchPhone: "",
      branchCity: "",
      branchCountry: "",
      branchAddress: "",
      residenceGuidelines: null,
    });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    handleChange("residenceGuidelines", file);
  };

  const isEditing = editBranch && editIndex !== undefined;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          p: 0,
          bgcolor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: theme.typography.h2.fontWeight }}
            >
              {isEditing ? "Edit Branch" : "Add a Branch"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form Fields */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
            >
              Branch Name
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Berlin Support Center"
              value={branchData.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
            >
              Branch Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="e.g., example@gmail.com"
              value={branchData.branchEmail}
              onChange={(e) => handleChange("branchEmail", e.target.value)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
            >
              Branch Phone Number
            </Typography>
            <TextField
              fullWidth
              type="tel"
              placeholder="e.g., +971 4 332 8788"
              value={branchData.branchPhone}
              onChange={(e) => handleChange("branchPhone", e.target.value)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
              >
                Country
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={branchData.branchCountry}
                  onChange={(e) =>
                    handleChange("branchCountry", e.target.value)
                  }
                  displayEmpty
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider,
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a country
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
              >
                City
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={branchData.branchCity}
                  onChange={(e) => handleChange("branchCity", e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider,
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a city
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
            >
              Full Address
            </Typography>
            <TextField
              fullWidth
              value={branchData.branchAddress}
              onChange={(e) => handleChange("branchAddress", e.target.value)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
              }}
            />
          </Box>

          {/* File Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: theme.typography.h3.fontWeight }}
            >
              Upload Residence Guide
            </Typography>

            {branchData.residenceGuidelines ? (
              <Box
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  p: 2,
                  backgroundColor: "#F8FAF9",
                }}
              >
                <Typography>
                  {branchData.residenceGuidelines instanceof File
                    ? branchData.residenceGuidelines.name
                    : branchData.residenceGuidelines || ""}
                </Typography>
              </Box>
            ) : (
              <Box
                component="label"
                sx={{
                  border: "2px dashed #C1CCC5",
                  borderRadius: "8px",
                  p: 3,
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
                <CloudUploadIcon
                  sx={{ fontSize: 40, color: "#7A8B84", mb: 1 }}
                />
                <Typography variant="body2" sx={{ color: "#3B4B44", mb: 0.5 }}>
                  Upload Residence Guide
                </Typography>
                <Typography variant="caption" sx={{ color: "#7A8B84" }}>
                  Accepted formats: JPG, PNG, PDF (Max: 5MB)
                </Typography>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </Box>
            )}
          </Box>

          {/* Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ flex: 1, color: "#666", borderColor: "#E0E0E0" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                flex: 1,
                backgroundColor: "#A1B7AF",
                "&:hover": { backgroundColor: "#8A9D95" },
              }}
            >
              {isEditing ? "Update Branch" : "Add a Branch"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
