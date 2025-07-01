import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
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
import { Branch } from "../../../../../../interface";

interface BranchesFieldProps {
  value: Branch[];
  onChange: (branches: Branch[]) => void;
}

export const BranchesField: React.FC<BranchesFieldProps> = ({
  value,
  onChange,
}) => {
  const theme = useTheme<Theme>();
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
            border: `2px dashed ${theme.palette.divider}`,
            borderRadius: theme.spacing(2), // 16px equivalent
            p: theme.spacing(4),
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            mb: theme.spacing(2),
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.h6.fontWeight,
              color: theme.palette.text.primary,
              mb: theme.spacing(2),
            }}
          >
            Add Branches
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: theme.spacing(3),
              lineHeight: 1.6,
            }}
          >
            You can register all your branch locations here. If you only operate
            in one location, feel free to skip this step.
          </Typography>

          <Button
            variant="text"
            onClick={handleAddNewBranch}
            startIcon={<AddIcon />}
            sx={{
              color: theme.palette.text.primary,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
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
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: theme.spacing(1.5), // 12px equivalent
            p: theme.spacing(3),
            mb: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: theme.spacing(2),
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: theme.typography.h6.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              {branch.branchName || "Downtown"}
            </Typography>
            <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
              <IconButton
                size="small"
                onClick={() => removeBranch(index)}
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.error.main,
                    backgroundColor: theme.palette.error.light,
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Button
                size="small"
                onClick={() => editBranch(index)}
                startIcon={<EditIcon fontSize="small" />}
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  minWidth: "auto",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}
          >
            <PhoneIcon
              sx={{
                color: theme.palette.primary.main,
                mr: theme.spacing(1),
                fontSize: 16,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {branch.branchPhone || "+971 4 332 8789"}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}
          >
            <EmailIcon
              sx={{
                color: theme.palette.primary.main,
                mr: theme.spacing(1),
                fontSize: 16,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {branch.branchEmail || "wa83@outlook.com"}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: theme.spacing(1) }}
          >
            <LocationOnIcon
              sx={{
                color: theme.palette.primary.main,
                mr: theme.spacing(1),
                fontSize: 16,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {branch.branchCity || "Axton"},{" "}
              {branch.branchCountry || "États-Unis"}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}
          >
            <BusinessIcon
              sx={{
                color: theme.palette.primary.main,
                mr: theme.spacing(1),
                fontSize: 16,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {branch.branchAddress ||
                "Bureau 905, One Central, Trade Centre Area"}
            </Typography>
          </Box>

          {branch.residenceGuidelines && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DescriptionIcon
                sx={{
                  color: theme.palette.primary.main,
                  mr: theme.spacing(1),
                  fontSize: 20,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
              >
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
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: theme.spacing(1.5), // 12px equivalent
          color: theme.palette.primary.main,
          py: theme.spacing(2),
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.main,
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
