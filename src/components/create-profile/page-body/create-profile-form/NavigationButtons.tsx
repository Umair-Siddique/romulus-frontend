import { Button } from "@mui/material";

import { NavigationButtonProps } from "#types";
import { useTheme, Theme } from "@mui/material/styles";

export const NavigationButton = ({
  handleNavigation,
  navigateTo,
  isDisabled,
  bgColor,
  textColor,
  label,
}: NavigationButtonProps) => {
  const theme = useTheme<Theme>();

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
        fontWeight: theme.typography.h3.fontWeight,
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
