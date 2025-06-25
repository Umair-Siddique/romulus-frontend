import React from "react";
import { Box, Chip } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const SkillChips: React.FC<any> = ({ skills }) => {
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
  );
};
