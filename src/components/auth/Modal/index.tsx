import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

export const Modal = ({
  open,
  onClose,
  icon,
  title,
  description,
  buttonText,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={false}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          padding: 0,
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#666",
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: 4,
            py: 5,
          }}
        >
          {/* Dynamic Icon */}
          {icon ? (
            <Box
              sx={{
                fontSize: 80,
                color: "#4CAF50",
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& > *": {
                  fontSize: "inherit",
                },
              }}
            >
              {icon}
            </Box>
          ) : (
            <CheckCircle
              sx={{
                fontSize: 80,
                color: "#4CAF50",
                mb: 3,
              }}
            />
          )}
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 2,
              fontFamily: "inter, sans-serif",
            }}
          >
            {title}
          </Typography>
          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 4,
              lineHeight: 1.6,
              maxWidth: 400,
              fontFamily: "inter, sans-serif",
            }}
          >
            {description}
          </Typography>
          {/* Action Button */}
          <Button
            onClick={onClose}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#A1B7AF",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 500,
              textTransform: "none",
              fontFamily: "inter, sans-serif",
              "&:hover": {
                backgroundColor: "#A1B7AF",
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
