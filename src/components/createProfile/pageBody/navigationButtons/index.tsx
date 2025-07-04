import React from "react";
import { Button } from "@mui/material";

interface NavigationButtonProps {
  handleNavigation: (direction: "back" | "next") => void;
  navigateTo: "back" | "next";
  isDisabled?: boolean;
  bgColor?: string;
  textColor?: string;
  label: string;
}

export const NavigationButton = ({
  handleNavigation,
  navigateTo,
  isDisabled,
  bgColor,
  textColor,
  label,
}: NavigationButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={() => handleNavigation(navigateTo)}
      disabled={isDisabled}
      sx={{
        bgcolor: bgColor,
        color: textColor,
        px: 6,
        py: 1.5,
        borderRadius: 2,
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 500,
        "&:hover": {
          bgcolor: "#8da098",
        },
        "&:disabled": {
          bgcolor: "#e0e0e0",
          color: "#999",
        },
      }}
    >
      {label}
    </Button>
  );
};

NavigationButton.displayName = "NavigationButton";