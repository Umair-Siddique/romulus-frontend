import { Box, Typography, TextField, IconButton, Chip, useTheme } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormDataProps } from "#types";

interface SkillsSectionProps {
  register: UseFormRegister<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  setValue: UseFormSetValue<FormDataProps>;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  skillsArray: string[];
  setSkillsArray: (skills: string[]) => void;
}

export const SkillsSection = ({
  register,
  errors,
  setValue,
  newSkill,
  setNewSkill,
  skillsArray,
  setSkillsArray,
}: SkillsSectionProps) => {
  const theme = useTheme();

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsArray.includes(newSkill.trim())) {
      const updatedSkills = [...skillsArray, newSkill.trim()];
      setSkillsArray(updatedSkills);
      setValue("skills", updatedSkills.join(", "), { shouldValidate: true });
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const updatedSkills = skillsArray.filter((skill) => skill !== skillToRemove);
    setSkillsArray(updatedSkills);
    setValue("skills", updatedSkills.join(", "), { shouldValidate: true });
  };

  return (
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1) }}>
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
      {errors.skills && typeof errors.skills?.message === "string" && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {errors.skills.message}
        </Typography>
      )}
    </Box>
  );
};