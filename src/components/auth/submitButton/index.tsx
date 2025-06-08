import { Button } from "@mui/material";
import React from "react";

type SubmitButtonProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText: string;
  loadedText: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isDisabled,
  isLoading,
  loadingText,
  loadedText,
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={isDisabled}
      sx={{
        background: "#A1B7AF",
        py: 1.8,
        px: 6,
        width: 300,
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 600,
        borderRadius: 4,
        boxShadow: "#A1B7AF",
        fontFamily: "montserrat, sans-serif",
        "&:hover": {
          background: "#8fa89f",
        },
      }}
    >
      {isLoading ? loadingText : loadedText}
    </Button>
  );
};

export default SubmitButton;
