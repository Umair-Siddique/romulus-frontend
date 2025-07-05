import { Button } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { SubmitButtonProps } from "#types";

const AuthSubmitButton = ({
  type,
  onClick,
  isDisabled,
  isLoading,
  loadingText,
  loadedText,
}: SubmitButtonProps) => {
  const theme = useTheme<Theme>();

  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      disabled={isDisabled}
      sx={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: theme.spacing(1.8), // Keeping original spacing proportions
        px: theme.spacing(6),
        width: theme.spacing(37.5), // 300px equivalent using theme spacing (300/8 = 37.5)
        textTransform: "none", // This matches your theme's button override
        fontSize: "1rem", // 16px equivalent using rem, or could use theme.typography.button.fontSize
        fontWeight: theme.typography.button.fontWeight, // Using theme's button fontWeight (600)
        borderRadius: theme.spacing(2), // 8px equivalent, matching your theme's button borderRadius override
        boxShadow: "0px 2px 4px rgba(126, 148, 142, 0.2)",
        fontFamily: theme.typography.button.fontFamily,
        "&:hover": {
          background: theme.palette.primary.dark,
          boxShadow: "0px 4px 8px rgba(126, 148, 142, 0.3)",
        },
      }}
    >
      {isLoading ? loadingText : loadedText}
    </Button>
  );
};

export default AuthSubmitButton;

AuthSubmitButton.displayName = "AuthSubmitButton";
