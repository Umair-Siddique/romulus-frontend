import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import Markdown from "react-markdown";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  button1OnClick?: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  hasButton?: boolean;
  hasButton1?: boolean;
  buttonText?: string;
  button1Text?: string;
  additionalElements?: React.ReactNode;
  hasAdditionalElements?: boolean;
  hasRating?: boolean;
  rating?: number;
  onRatingChange?: (value: number) => void;
}

export const Modal = React.memo(
  ({
    open,
    onClose,
    onSubmit,
    button1OnClick,
    icon,
    title,
    description,
    hasButton = false,
    hasButton1 = false,
    buttonText = "Close",
    button1Text = "Submit",
    additionalElements,
    hasAdditionalElements = false,
    hasRating = false,
    rating = 0,
    onRatingChange,
  }: ModalProps) => {
    const theme = useTheme<Theme>();

    const handleRatingChange = (
      event: React.SyntheticEvent,
      newValue: number | null
    ) => {
      if (onRatingChange && newValue !== null) {
        onRatingChange(newValue);
      }
    };

    const isCloseButton = (text: string) => text === "Close";

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
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: theme.spacing(2),
              top: theme.spacing(2),
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
            {icon && (
              <Box
                sx={{
                  fontSize: theme.spacing(8),
                  color: theme.palette.primary.main,
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
            )}

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: theme.typography.h2.fontWeight,
                color: theme.palette.text.primary,
                ...(!hasRating ? { mb: theme.spacing(2) } : {}),
                fontFamily: theme.typography.h5.fontFamily,
              }}
            >
              {title}
            </Typography>

            {/* Description */}
            <Markdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    style={{
                      color: theme.palette.text.secondary,
                      ...(!hasRating ? { marginBottom: theme.spacing(4) } : {}),
                      lineHeight: theme.typography.body1.lineHeight,
                      maxWidth: theme.spacing(50),
                      fontFamily: theme.typography.body1.fontFamily,
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {description}
            </Markdown>

            {/* Rating */}
            {hasRating && (
              <Box sx={{ mb: theme.spacing(1) }}>
                <Rating
                  value={rating}
                  onChange={handleRatingChange}
                  sx={{
                    mb: theme.spacing(1),
                    fontSize: theme.spacing(3),
                  }}
                />
              </Box>
            )}

            {/* Additional Elements */}
            {hasAdditionalElements && additionalElements && (
              <Box sx={{ mb: theme.spacing(4), width: "100%" }}>
                {additionalElements}
              </Box>
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: hasButton1 ? "flex" : "block",
                justifyContent: "center",
                alignItems: "center",
                gap: theme.spacing(2),
                width: "100%",
              }}
            >
              {hasButton && (
                <Button
                  onClick={onSubmit}
                  variant={isCloseButton(buttonText) ? "outlined" : "contained"}
                  size="large"
                  sx={{
                    width: hasButton1 ? "50%" : "auto",
                    backgroundColor: isCloseButton(buttonText)
                      ? "transparent"
                      : theme.palette.primary.main,
                    color: isCloseButton(buttonText)
                      ? theme.palette.text.primary
                      : theme.palette.primary.contrastText,
                    px: theme.spacing(4),
                    py: theme.spacing(1.5),
                    border: isCloseButton(buttonText)
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: theme.typography.button.fontWeight,
                    textTransform: "none",
                    fontFamily: theme.typography.button.fontFamily,
                    "&:hover": {
                      backgroundColor: isCloseButton(buttonText)
                        ? theme.palette.action.hover
                        : theme.palette.primary.dark,
                    },
                  }}
                >
                  {buttonText}
                </Button>
              )}

              {hasButton1 && (
                <Button
                  onClick={button1OnClick}
                  variant={
                    isCloseButton(button1Text) ? "outlined" : "contained"
                  }
                  size="large"
                  sx={{
                    width: hasButton ? "50%" : "auto",
                    backgroundColor: isCloseButton(button1Text)
                      ? "transparent"
                      : theme.palette.primary.main,
                    color: isCloseButton(button1Text)
                      ? theme.palette.text.primary
                      : theme.palette.primary.contrastText,
                    px: theme.spacing(4),
                    py: theme.spacing(1.5),
                    border: isCloseButton(button1Text)
                      ? `1px solid ${theme.palette.divider}`
                      : "none",
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: theme.typography.button.fontWeight,
                    textTransform: "none",
                    fontFamily: theme.typography.button.fontFamily,
                    "&:hover": {
                      backgroundColor: isCloseButton(button1Text)
                        ? theme.palette.action.hover
                        : theme.palette.primary.dark,
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
  }
);
