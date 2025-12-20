import {
  VisibilityOffOutlined as VisibilityOffIcon,
  VisibilityOutlined as VisibilityIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useCustomMutation } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";

export const Password = React.memo(() => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();
  const { userId } = user || {};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { mutate: updatePassword } = useCustomMutation();

  const getInputProps = (func: () => void) => (
    <InputAdornment position="end">
      <IconButton
        onClick={func}
        edge="end"
        aria-label="toggle password visibility"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );

  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError(
        "Veuillez entrer à la fois un nouveau mot de passe et un mot de passe de confirmation"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setError("Le mot de passe doit comporter au moins 8 caractères");
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[A-Z]/.test(confirmPassword)) {
      setError("Le mot de passe doit contenir au moins une lettre majuscule");
      return;
    }

    if (!/[0-9]/.test(newPassword) || !/[0-9]/.test(confirmPassword)) {
      setError("Le mot de passe doit contenir au moins un chiffre");
      return;
    }

    if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword) ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(confirmPassword)
    ) {
      setError("Le mot de passe doit contenir au moins un caractère spécial");
      return;
    }

    updatePassword(
      {
        url: "/auth/update-password",
        method: "patch",
        values: {
          userId,
          password: newPassword,
        },
      },
      {
        onSuccess: () => {
          setError("");
          setNewPassword("");
          setConfirmPassword("");
          setSuccess("Password updated successfully");
        },
      }
    );
  };

  return (
    <Box>
      <Typography
        sx={{
          mb: theme.spacing(2),
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.palette.text.primary,
        }}
      >
        Changer le mot de passe
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(2),
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: theme.spacing(1),
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.h3.fontWeight,
                  fontSize: "0.875rem",
                  fontFamily: theme.typography.body2.fontFamily,
                }}
              >
                Nouveau mot de passe
              </Typography>

              <TextField
                fullWidth
                placeholder="Entrez votre nouveau mot de passe"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{
                  width: theme.spacing(56.25),
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: getInputProps(() =>
                    setShowPassword(!showPassword)
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: theme.spacing(1),
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.h3.fontWeight,
                  fontSize: "0.875rem",
                  fontFamily: theme.typography.body2.fontFamily,
                }}
              >
                Confirmer le mot de passe
              </Typography>

              <TextField
                fullWidth
                placeholder="Entrez votre mot de passe"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  width: theme.spacing(56.25),
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: getInputProps(() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  ),
                }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleUpdatePassword}
            sx={{
              mt: theme.spacing(2),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            Mettre à jour le mot de passe
          </Button>
          {error && (
            <Typography
              variant="body2"
              sx={{
                mt: theme.spacing(1),
                color: theme.palette.error.main,
                fontWeight: theme.typography.body2.fontWeight,
                fontSize: "0.875rem",
                fontFamily: theme.typography.body2.fontFamily,
              }}
            >
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              variant="body2"
              sx={{
                mt: theme.spacing(1),
                color: theme.palette.success.main,
                fontWeight: theme.typography.body2.fontWeight,
                fontSize: "0.875rem",
                fontFamily: theme.typography.body2.fontFamily,
              }}
            >
              {success}
            </Typography>
          )}
        </Box>
        <Card
          sx={{
            width: 275,
            height: 205,
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <CardContent>
            <InfoIcon sx={{ color: theme.palette.primary.main }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: theme.typography.h2.fontWeight }}
            >
              Exigences en matière de mot de passe
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: theme.typography.body2.fontWeight }}
            >
              Votre nouveau mot de passe doit comporter au moins 8 caractères et
              inclure une lettre majuscule, un chiffre et un caractère spécial
              (comme @, #, $, etc.).
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
});
