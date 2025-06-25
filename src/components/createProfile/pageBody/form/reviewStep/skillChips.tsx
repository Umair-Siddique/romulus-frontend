import React from "react";
import { Box, Chip } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

interface SkillChipsProps {
  skills: string[];
}

export const SkillChips: React.FC<SkillChipsProps> = ({ skills }) => {
  const theme = useTheme<Theme>();

  if (!Array.isArray(skills)) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1) }}>
      {skills.map((skill: string, index: number) => (
        <Chip
          key={index}
          label={skill}
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: "0.875rem",
          }}
        />
      ))}
    </Box>
  );
};
