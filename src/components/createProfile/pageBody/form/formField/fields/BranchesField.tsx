import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { BranchModal } from "../../branchModal";
import { colors } from "../styles";
import { Branch } from "../../../../../../interface";

interface BranchesFieldProps {
  value: Branch[];
  onChange: (branches: Branch[]) => void;
}

export const BranchesField: React.FC<BranchesFieldProps> = ({
  value,
  onChange,
}) => {
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );

  const branches = Array.isArray(value) ? value : [];

  const addBranch = (branchData: Branch, editIndex?: number) => {
    if (editIndex !== undefined) {
      // Update existing branch
      const updatedBranches = [...branches];
      updatedBranches[editIndex] = branchData;
      onChange(updatedBranches);
    } else {
      // Add new branch
      onChange([...branches, branchData]);
    }
    setShowBranchModal(false);
    setEditingBranch(null);
    setEditingIndex(undefined);
  };

  const removeBranch = (index: number) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    onChange(updatedBranches);
  };

  const editBranch = (index: number) => {
    setEditingBranch(branches[index]);
    setEditingIndex(index);
    setShowBranchModal(true);
  };

  const handleAddNewBranch = () => {
    setEditingBranch(null);
    setEditingIndex(undefined);
    setShowBranchModal(true);
  };

  const handleCloseModal = () => {
    setShowBranchModal(false);
    setEditingBranch(null);
    setEditingIndex(undefined);
  };

  if (branches.length === 0) {
    return (
      <Box>
        <Box
          sx={{
            border: `2px dashed ${colors.border}`,
            borderRadius: "16px",
            p: 4,
            textAlign: "center",
            backgroundColor: colors.backgroundAlt,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: colors.text, mb: 2 }}
          >
            Add Branches
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, mb: 3, lineHeight: 1.6 }}
          >
            You can register all your branch locations here. If you only operate
            in one location, feel free to skip this step.
          </Typography>

          <Button
            variant="text"
            onClick={handleAddNewBranch}
            startIcon={<AddIcon />}
            sx={{
              color: colors.text,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Add a Branch
          </Button>
        </Box>

        <BranchModal
          open={showBranchModal}
          onClose={handleCloseModal}
          onSave={addBranch}
          editBranch={editingBranch}
          editIndex={editingIndex}
        />
      </Box>
    );
  }

  return (
    <Box>
      {branches.map((branch, index) => (
        <Box
          key={index}
          sx={{
            border: `2px solid ${colors.primary}`,
            borderRadius: "12px",
            p: 3,
            mb: 2,
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: colors.text }}
            >
              {branch.branchName || "Downtown"}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => removeBranch(index)}
                sx={{ color: "#666" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Button
                size="small"
                onClick={() => editBranch(index)}
                startIcon={<EditIcon fontSize="small" />}
                sx={{
                  color: "#666",
                  fontSize: "0.75rem",
                  textTransform: "none",
                  minWidth: "auto",
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PhoneIcon sx={{ color: colors.primary, mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: colors.text }}>
              {branch.branchPhone || "+971 4 332 8789"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EmailIcon sx={{ color: colors.primary, mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: colors.text }}>
              {branch.branchEmail || "wa83@outlook.com"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOnIcon
              sx={{ color: colors.primary, mr: 1, fontSize: 16 }}
            />
            <Typography variant="body2" sx={{ color: colors.text }}>
              {branch.branchCity || "Axton"},{" "}
              {branch.branchCountry || "États-Unis"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <BusinessIcon sx={{ color: colors.primary, mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ color: colors.text }}>
              {branch.branchAddress ||
                "Bureau 905, One Central, Trade Centre Area"}
            </Typography>
          </Box>
          {branch.residenceGuidelines && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DescriptionIcon
                sx={{ color: colors.primary, mr: 1, fontSize: 20 }}
              />
              <Typography variant="body2" sx={{ color: colors.text }}>
                {branch.residenceGuidelines.name || "Residence_guideline.pdf"}
              </Typography>
            </Box>
          )}
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={handleAddNewBranch}
        startIcon={<AddIcon />}
        fullWidth
        sx={{
          border: `2px solid ${colors.primary}`,
          borderRadius: "12px",
          color: colors.primary,
          py: 2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: colors.primaryLight,
            borderColor: colors.primary,
          },
        }}
      >
        Add a Branch
      </Button>

      <BranchModal
        open={showBranchModal}
        onClose={handleCloseModal}
        onSave={addBranch}
        editBranch={editingBranch}
        editIndex={editingIndex}
      />
    </Box>
  );
};
