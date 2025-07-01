import React from "react";
import { Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

export const LogoutButton = () => {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<LogoutIcon />}
      sx={{
        borderColor: "#f44336",
        color: "#f44336",
        mb: 2,
        textTransform: "none",
        "&:hover": {
          borderColor: "#f44336",
          backgroundColor: "#ffebee",
        },
      }}
    >
      Log-Out
    </Button>
  );
};
