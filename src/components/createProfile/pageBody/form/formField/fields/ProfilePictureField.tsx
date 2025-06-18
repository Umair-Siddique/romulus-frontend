import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import {
  Person as PersonIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material";
import { colors } from "../styles";

interface ProfilePictureFieldProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export const ProfilePictureField: React.FC<ProfilePictureFieldProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Box sx={{ position: "relative" }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            backgroundColor: colors.primaryLight,
            border: `3px solid ${colors.primary}`,
            cursor: "pointer",
          }}
          src={value ? URL.createObjectURL(value) : undefined}
        >
          <PersonIcon sx={{ fontSize: 40, color: colors.textSecondary }} />
        </Avatar>
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: colors.primary,
            color: "white",
            width: 32,
            height: 32,
            "&:hover": { backgroundColor: colors.primaryDark },
          }}
        >
          <CameraIcon sx={{ fontSize: 16 }} />
          <input type="file" hidden accept="image/*" onChange={handleChange} />
        </IconButton>
      </Box>
    </Box>
  );
};
