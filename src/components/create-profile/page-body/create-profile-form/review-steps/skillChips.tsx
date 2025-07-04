import { Box, Chip } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { SkillChipsProps } from "#types";

export const SkillChips = ({ skills }: SkillChipsProps) => {
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
