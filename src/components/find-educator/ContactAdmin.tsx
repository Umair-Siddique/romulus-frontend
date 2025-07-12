import { Box, Typography } from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { useState } from "react";

export const ContactAdmin = () => {
  const theme = useTheme<Theme>();

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+1 (234) 567-890");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@romulus.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <Box
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PhoneIcon sx={{ fontSize: 16, mr: 1 }} />
          <Typography>+1 (234) 567-890</Typography>
        </Box>
        <Box
          sx={{
            ml: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
            transform: copiedPhone ? "scale(1.1)" : "scale(1)",
            color: copiedPhone ? theme.palette.success.main : "inherit",
          }}
          onClick={handleCopyPhone}
        >
          {copiedPhone ? (
            <CheckIcon sx={{ fontSize: 20 }} />
          ) : (
            <CopyIcon sx={{ fontSize: 20 }} />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
          <Typography>support@romulus.com</Typography>
        </Box>
        <Box
          sx={{
            ml: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
            transform: copiedEmail ? "scale(1.1)" : "scale(1)",
            color: copiedEmail ? theme.palette.success.main : "inherit",
          }}
          onClick={handleCopyEmail}
        >
          {copiedEmail ? (
            <CheckIcon sx={{ fontSize: 20 }} />
          ) : (
            <CopyIcon sx={{ fontSize: 20 }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
