import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";

import { ModalProps } from "../interface";

export const Modal = ({
  open,
  onClose,
  onSubmit,
  icon,
  title,
  description,
  showButton,
  buttonText,
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
          <Close />
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
              fontSize: theme.spacing(10), // 80px equivalent using theme spacing
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
            variant="h5"
            sx={{
              fontWeight: theme.typography.h5.fontWeight,
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

          {/* Action Button */}
          {showButton && (
            <Button
              onClick={onSubmit}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: theme.spacing(4),
                py: theme.spacing(1.5),
                borderRadius: theme.shape.borderRadius / 4,
                fontWeight: theme.typography.button.fontWeight,
                textTransform: "none",
                fontFamily: theme.typography.button.fontFamily,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {buttonText}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
