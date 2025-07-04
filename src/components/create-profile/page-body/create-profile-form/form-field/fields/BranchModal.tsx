import { useState, useEffect } from "react";
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
import { Close, CloudUpload as UploadIcon } from "@mui/icons-material";

import { BranchModalProps } from "#types";

export const BranchModal = ({
  open,
  onClose,
  onSave,
  editBranch,
  editIndex,
}: BranchModalProps) => {
  const [branchData, setBranchData] = useState<{
    branchName: string;
    branchEmail: string;
    branchPhone: string;
    branchCity: string;
    branchCountry: string;
    branchAddress: string;
    residenceGuidelines: File | null;
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
  }, [editBranch, open]);

  const handleChange = (field: string, value: any) => {
    setBranchData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(branchData);
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

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#F8FAF9",
      "& fieldset": { borderWidth: 0 },
      "&:hover fieldset": { borderWidth: 0 },
      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#A1B7AF",
      },
    },
  };

  const branchCityOptions = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Berlin",
    "Munich",
    "Hambourg",
    "Francfort",
    "Cologne",
    "Oslo",
    "Bergen",
    "Trondheim",
    "Stavanger",
    "Drammen",
    "Stockholm",
    "Gothenburg",
    "Malmö",
    "Uppsala",
    "Västerås",
    "Toronto",
    "Vancouver",
    "Montréal",
    "Calgary",
    "Ottawa",
    "Amsterdam",
    "Rotterdam",
    "La Haye",
    "Utrecht",
    "Eindhoven",
    "Copenhague",
    "Aarhus",
    "Odense",
    "Aalborg",
    "Esbjerg",
    "Londres",
    "Manchester",
    "Birmingham",
    "Édimbourg",
    "Glasgow",
    "Dubaï",
    "Abou Dabi",
    "Charjah",
    "Ajman",
    "Fujairah",
  ];

  const branchCountryOptions = [
    "France",
    "Allemagne",
    "Norvège",
    "Suède",
    "Canada",
    "Pays-Bas",
    "Danemark",
    "Royaume-Uni",
    "Émirats Arabes Unis (UAE)",
  ];

  const isEditing = editBranch && editIndex !== undefined;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 0 }}>
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
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditing ? "Edit Branch" : "Add a Branch"}
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          {/* Form Fields */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Branch Name
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Berlin Support Center"
              value={branchData.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              sx={inputStyles}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Branch Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="e.g., example@gmail.com"
              value={branchData.branchEmail}
              onChange={(e) => handleChange("branchEmail", e.target.value)}
              sx={inputStyles}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Branch Phone Number
            </Typography>
            <TextField
              fullWidth
              type="tel"
              placeholder="e.g., +971 4 332 8788"
              value={branchData.branchPhone}
              onChange={(e) => handleChange("branchPhone", e.target.value)}
              sx={inputStyles}
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
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Country
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={branchData.branchCountry}
                  onChange={(e) =>
                    handleChange("branchCountry", e.target.value)
                  }
                  displayEmpty
                  sx={inputStyles}
                >
                  <MenuItem value="" disabled>
                    Select a country
                  </MenuItem>
                  {branchCountryOptions.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                City
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={branchData.branchCity}
                  onChange={(e) => handleChange("branchCity", e.target.value)}
                  displayEmpty
                  sx={inputStyles}
                >
                  <MenuItem value="" disabled>
                    Select a city
                  </MenuItem>
                  {branchCityOptions.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Full Address
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Alexanderplatz 4, 10178 Berlin"
              value={branchData.branchAddress}
              onChange={(e) => handleChange("branchAddress", e.target.value)}
              sx={inputStyles}
            />
          </Box>

          {/* File Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
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
                <UploadIcon sx={{ fontSize: 40, color: "#7A8B84", mb: 1 }} />
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
