import { Box, Theme, Typography, useTheme } from "@mui/material";

import { TextLink } from "#components";

export const GetFormConfig = (
  formStep: number,
  requestOtpAgain: () => void
) => {
  const theme = useTheme<Theme>();

  if (formStep === 1) {
    return {
      title: "Sélectionnez votre type d'utilisateur",
      description:
        "Choisissez votre rôle pour continuer le processus d'inscription ou de connexion.",
    };
  } else if (formStep === 2) {
    return {
      title: "Créer votre compte",
      description: "Remplissez vos informations pour vous inscrire.",
      bottomContent: (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: "14px",
            fontFamily: "inter, sans-serif",
          }}
        >
          Déjà un compte ? <TextLink to="/login" label="Se connecter" />
        </Typography>
      ),
      submitLoadingText: "Inscription en cours...",
      submitLabel: "S'inscrire",
    };
  }

  return {
    title: "Vérifiez votre numéro WhatsApp",
    description:
      "Entrez le code à 6 chiffres envoyé à votre WhatsApp (+92 3XXXXXXXXX) pour vérifier votre numéro.",
    bottomContent: (
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{
          mb: 2,
          fontSize: "14px",
          fontFamily: "inter, sans-serif",
        }}
      >
        Vous n'avez pas reçu de code ?{" "}
        <Box
          component="span"
          sx={{
            color: "#A1B7AF",
            textDecoration: "none",
            fontWeight: theme.typography.h2.fontWeight,
            cursor: "pointer",
            background: "none",
            fontFamily: "montserrat, sans-serif",
            fontSize: "14px",
          }}
          onClick={requestOtpAgain}
        >
          Demander à nouveau.
        </Box>
      </Typography>
    ),
  };
};
