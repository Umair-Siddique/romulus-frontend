import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

export const getModalConfig = (
  form: any,
  setFormStep: any,
  formStep: number,
  userRole: string,
  setShowModal: any
) => {
  const navigate = useNavigate();

  if (formStep === 2) {
    if (userRole === "organization") {
      return {
        open: true,
        icon: <GridCheckCircleIcon />,
        onClose: () => setShowModal(false),
        onSubmit: () => navigate("/login"),
        title: "Compte créé avec succès!",
        description:
          "Vous y êtes presque ! Connectez-vous pour compléter votre profil et télécharger vos documents d'identité pour commencer.",
        buttonText: "Se connecter maintenant",
      };
    } else {
      return {
        open: true,
        icon: <GridCheckCircleIcon />,
        onClose: () => setShowModal(false),
        onSubmit: () => {
          form.reset();
          setShowModal(false);
          setFormStep(3);
        },
        title: "Compte créé avec succès!",
        description:
          "Votre compte éducateur est prêt. Vérifiez votre e-mail pour le lien de vérification et WhatsApp pour le code.",
        buttonText: "Continuer pour entrer le code",
      };
    }
  } else {
    return {
      open: true,
      icon: <GridCheckCircleIcon />,
      onClose: () => setShowModal(false),
      onSubmit: () => setFormStep(3),
      title: "TITLE",
      description: "DESCRIPTION",
      buttonText: "BUTTON TEXT",
    };
  }
};
