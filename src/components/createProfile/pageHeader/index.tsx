import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import Logo from "../../../assets/images/logo.png";

export const PageHeader: React.FC = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center" }}>
          <Box component="img" src={Logo} alt="Logo" width={40} height={40} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
