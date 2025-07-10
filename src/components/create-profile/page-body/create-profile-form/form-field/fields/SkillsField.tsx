import { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { Box, Typography, TextField, IconButton, Chip } from "@mui/material";

import { SkillsFieldProps } from "#types";

export const SkillsField = ({
  value,
  onChange,
  required = false,
}: SkillsFieldProps) => {
  const theme = useTheme<Theme>();
  const [skillInput, setSkillInput] = useState("");
  const skills = Array.isArray(value) ? value : [];

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      onChange([...skills, skillInput.trim().toLowerCase()]);
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
        sx={{
          mb: theme.spacing(1),
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        Add Skills {required && "*"}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
        <TextField
          fullWidth
          placeholder="Add your skills (e.g., calmness, patience, concentration, report writing, teaching, sports practice)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
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
          onClick={handleSkillAdd}
          sx={{
            ml: theme.spacing(1),
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1) }}>
        {skills.map((skill: string, index: number) => (
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
  );
};
