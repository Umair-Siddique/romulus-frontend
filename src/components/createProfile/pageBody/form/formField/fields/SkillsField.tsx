import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Chip } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { inputFocusStyles, colors } from "../styles";

interface SkillsFieldProps {
  value: string[];
  onChange: (skills: string[]) => void;
  required?: boolean;
}

export const SkillsField: React.FC<SkillsFieldProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const [skillInput, setSkillInput] = useState("");
  const skills = Array.isArray(value) ? value : [];

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      onChange([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ mb: 1, fontWeight: 500, color: colors.text }}
      >
        Add Skills {required && "*"}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Add your skills (e.g., calmness, patience, concentration, report writing, teaching, sports practice)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
          sx={inputFocusStyles}
        />
        <IconButton
          onClick={handleSkillAdd}
          sx={{
            ml: 1,
            backgroundColor: colors.primaryLight,
            color: colors.primary,
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
              backgroundColor: colors.primaryLight,
              color: colors.text,
              "& .MuiChip-deleteIcon": {
                color: colors.textSecondary,
                "&:hover": {
                  color: colors.primary,
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
