import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  Person as PersonIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material";

import { AvatarFieldProps } from "#types";

export const AvatarField = ({ value, onChange }: AvatarFieldProps) => {
  const theme = useTheme<Theme>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", mb: theme.spacing(4) }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          sx={{
            width: theme.spacing(15), // 120px equivalent
            height: theme.spacing(15), // 120px equivalent
            backgroundColor: theme.palette.primary.light,
            border: `3px solid ${theme.palette.primary.main}`,
            cursor: "pointer",
          }}
          src={value ? URL.createObjectURL(value) : undefined}
        >
          <PersonIcon
            sx={{
              fontSize: 40,
              color: theme.palette.text.secondary,
            }}
          />
        </Avatar>
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            width: theme.spacing(4), // 32px equivalent
            height: theme.spacing(4), // 32px equivalent
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <CameraIcon sx={{ fontSize: 16 }} />
          <input type="file" hidden accept="image/*" onChange={handleChange} />
        </IconButton>
      </Box>
    </Box>
  );
};
