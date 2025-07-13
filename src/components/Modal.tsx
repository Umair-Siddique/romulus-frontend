import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";

import { ModalProps } from "#types";

export const Modal = ({
  open,
  onClose,
  onSubmit,
  button1OnClick,
  icon,
  title,
  description,
  showButton,
  showButton1,
  buttonText,
  button1Text,
  additionalElements,
  hasAdditionalElements = false,
}: ModalProps) => {
  const theme = useTheme<Theme>();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={false}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: theme.shape.borderRadius * 1.5,
          padding: 0,
          backgroundColor: theme.palette.background.default, // Using theme background default
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: theme.spacing(2), // 16px equivalent
            top: theme.spacing(2), // 16px equivalent
            color: theme.palette.text.secondary,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: theme.spacing(4),
            py: theme.spacing(5),
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              fontSize: theme.spacing(8), // 64px equivalent using theme spacing
              color: theme.palette.primary.main, // Using primary color since success isn't defined in your theme
              mb: theme.spacing(3),
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

          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: theme.typography.h2.fontWeight,
              color: theme.palette.text.primary,
              mb: theme.spacing(2),
              fontFamily: theme.typography.h5.fontFamily,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: theme.spacing(4),
              lineHeight: theme.typography.body1.lineHeight,
              maxWidth: theme.spacing(50), // 400px equivalent using theme spacing (400/8 = 50)
              fontFamily: theme.typography.body1.fontFamily,
            }}
          >
            {description}
          </Typography>

          {/* Additional Elements */}
          {hasAdditionalElements && (
            <Box sx={{ mb: theme.spacing(4) }}>
              {additionalElements}
            </Box>
          )}

          {/* Action Button */}
          <Box
            sx={{
              display: `${showButton1 ? "flex" : "block"}`,
              justifyContent: "center",
              alignItems: "center",
              gap: theme.spacing(10),
              width: "100%",
            }}
          >
            {showButton && (
              <Button
                onClick={onSubmit}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor:
                    buttonText === "Close"
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.main,
                  color:
                    buttonText === "Close"
                      ? theme.palette.text.primary
                      : theme.palette.primary.contrastText,
                  px: theme.spacing(4),
                  py: theme.spacing(1.5),
                  border:
                    buttonText === "Close"
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: theme.typography.button.fontWeight,
                  textTransform: "none",
                  fontFamily: theme.typography.button.fontFamily,
                  "&:hover": {
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {buttonText}
              </Button>
            )}

            {showButton1 && (
              <Button
                onClick={button1OnClick}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor:
                    button1Text === "Close"
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.main,
                  color:
                    button1Text === "Close"
                      ? theme.palette.text.primary
                      : theme.palette.primary.contrastText,
                  px: theme.spacing(4),
                  py: theme.spacing(1.5),
                  border:
                    button1Text === "Close"
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                  borderRadius: theme.shape.borderRadius,
                  fontWeight: theme.typography.button.fontWeight,
                  textTransform: "none",
                  fontFamily: theme.typography.button.fontFamily,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {button1Text}
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
