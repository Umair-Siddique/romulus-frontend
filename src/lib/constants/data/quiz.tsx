import { Quiz as QuizIcon, Lens as CircleIcon } from "@mui/icons-material";

import { MCQType } from "#types";

export const quizData: MCQType[] = [
  {
    id: 1,
    question:
      "Q1. Quelle est la durée maximale d'un placement provisoire par OPP ?",
    options: [
      { id: 1, option: "6 mois", points: 0 },
      { id: 2, option: "2 mois", points: 10 },
      { id: 3, option: "12 mois", points: 0 },
      { id: 4, option: "Jusqu'à la majorité", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 2,
    question:
      "Q2. Qu'est-ce qu'une mesure d'Assistance Educative en Milieu Ouvert (AEMO) ?",
    options: [
      { id: 1, option: "Placement en foyer", points: 0 },
      { id: 2, option: "Mesure judiciaire d'éloignement familial", points: 0 },
      {
        id: 3,
        option: "Accompagnement éducatif avec maintien dans la famille",
        points: 10,
      },
      { id: 4, option: "Aide financière aux familles", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 3,
    question: "Q3. Qui peut décider d'une mesure de placement judiciaire ?",
    options: [
      { id: 1, option: "Inspecteur ASE", points: 0 },
      { id: 2, option: "Juge des enfants", points: 10 },
      { id: 3, option: "Chef de service", points: 0 },
      { id: 4, option: "Le maire de la commune", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 4,
    question: "Q4. Quelle est la durée légale du secret professionnel ?",
    options: [
      { id: 1, option: "Jusqu'à la fin de l'accompagnement", points: 0 },
      { id: 2, option: "10 ans", points: 0 },
      { id: 3, option: "Illimitée dans le temps", points: 10 },
      { id: 4, option: "5 ans", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 5,
    question: "Q5. Qu'est-ce qu'un projet individualisé ?",
    options: [
      { id: 1, option: "Un planning d'activités", points: 0 },
      { id: 2, option: "Une décision de justice", points: 0 },
      {
        id: 3,
        option:
          "Un document qui fixe les objectifs et les moyens pour un jeune",
        points: 10,
      },
      { id: 4, option: "Une fiche d'évaluation interne", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 6,
    question: "Q6. Quel est le rôle principal du juge des enfants ?",
    options: [
      { id: 1, option: "Sanctionner les délits", points: 0 },
      { id: 2, option: "Protéger les mineurs en danger", points: 10 },
      { id: 3, option: "Créer les règlements des foyers", points: 0 },
      { id: 4, option: "Faire des expertises pénales", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 7,
    question: "Q7. En France, à quel âge un enfant devient majeur ?",
    options: [
      { id: 1, option: "17 ans", points: 0 },
      { id: 2, option: "18 ans", points: 10 },
      { id: 3, option: "19 ans", points: 0 },
      { id: 4, option: "16 ans", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 8,
    question: "Q8. Que signifie le sigle PJJ ?",
    options: [
      { id: 1, option: "Prévention Jeunes et Justice", points: 0 },
      { id: 2, option: "Protection Judiciaire de la Jeunesse", points: 10 },
      { id: 3, option: "Police de la Jeunesse et des Juridictions", points: 0 },
      { id: 4, option: "Programme Jeunesse Jeunes", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 9,
    question: "Q9. Qui sont les titulaires de l'autorité parentale ?",
    options: [
      { id: 1, option: "Le parent gardien uniquement", points: 0 },
      {
        id: 2,
        option: "Les deux parents sauf décision judiciaire contraire",
        points: 10,
      },
      { id: 3, option: "L'établissement d'accueil", points: 0 },
      { id: 4, option: "L'ASE", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 10,
    question: "Q10. Quel texte encadre les droits de l'enfant ?",
    options: [
      { id: 1, option: "Le Code du Travail", points: 0 },
      {
        id: 2,
        option: "La Convention Internationale des Droits de l'Enfant (CIDE)",
        points: 10,
      },
      { id: 3, option: "La Constitution", points: 0 },
      { id: 4, option: "Le Code Civil", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 11,
    question:
      "Q11. Un enfant protégé peut-il porter plainte contre un éducateur ?",
    options: [
      { id: 1, option: "Non, car il est mineur", points: 0 },
      { id: 2, option: "Oui, comme tout citoyen", points: 10 },
      { id: 3, option: "Seulement avec autorisation du juge", points: 0 },
      { id: 4, option: "Seulement s'il est émancipé", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 12,
    question: "Q12. Le droit à l'image d'un enfant confié à l'ASE appartient :",
    options: [
      { id: 1, option: "À l'établissement", points: 0 },
      { id: 2, option: "Au représentant légal", points: 10 },
      { id: 3, option: "À l'enfant", points: 0 },
      { id: 4, option: "Au photographe", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 13,
    question: "Q13. Que signifie le principe de bientraitance ?",
    options: [
      { id: 1, option: "Dire oui à tout", points: 0 },
      {
        id: 2,
        option:
          "Mettre l'enfant au centre des pratiques, sans violence ni humiliation",
        points: 10,
      },
      { id: 3, option: "Être gentil", points: 0 },
      { id: 4, option: "Ne jamais faire de réflexion à l'enfant", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 14,
    question: 'Q14. Que veut dire "intégrité psychique" ?',
    options: [
      { id: 1, option: "L'hygiène mentale", points: 0 },
      {
        id: 2,
        option: "L'équilibre émotionnel et la santé psychologique",
        points: 10,
      },
      { id: 3, option: "Le QI de l'enfant", points: 0 },
      { id: 4, option: "Le rapport au corps", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 15,
    question: "Q15. L'entretien d'accueil d'un enfant vise principalement à :",
    options: [
      { id: 1, option: "Créer un lien d'amitié", points: 0 },
      {
        id: 2,
        option: "Établir la relation éducative et recueillir les besoins",
        points: 10,
      },
      { id: 3, option: "Rédiger le projet du jeune", points: 0 },
      { id: 4, option: "Evaluer son caractère", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 16,
    question: "Q16. Le droit de fugue existe-t-il ?",
    options: [
      { id: 1, option: "Oui, pour les enfants en protection", points: 0 },
      {
        id: 2,
        option:
          "Non, la fugue reste interdite mais ne peut être sanctionnée comme un crime",
        points: 10,
      },
      { id: 3, option: "Oui, avec autorisation du juge", points: 0 },
      { id: 4, option: "Non, elle est toujours punie", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 17,
    question: "Q17. Quelle est la mission principale de l'ASE ?",
    options: [
      { id: 1, option: "Financer les foyers", points: 0 },
      {
        id: 2,
        option: "Protéger les enfants en danger ou en risque de danger",
        points: 10,
      },
      { id: 3, option: "Recruter les éducateurs", points: 0 },
      { id: 4, option: "Organiser les formations", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 18,
    question:
      "Q18. Quel est le premier réflexe en prenant son poste d'éducateur ?",
    options: [
      { id: 1, option: "Saluer les jeunes", points: 0 },
      { id: 2, option: "Lire les transmissions", points: 10 },
      { id: 3, option: "Faire le tour des chambres", points: 0 },
      { id: 4, option: "Vérifier les stocks alimentaires", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 19,
    question:
      "Q19. Si un jeune vous signale qu'il a des poux, que faites-vous ?",
    options: [
      { id: 1, option: "J'appelle directement les parents", points: 0 },
      {
        id: 2,
        option:
          "Je le note dans le cahier de transmission et j'informe le chef de service",
        points: 10,
      },
      {
        id: 3,
        option: "Je lui donne un traitement sans en parler à personne",
        points: 0,
      },
      {
        id: 4,
        option: "Je lui rase la tête avec l'accord d'un collègue",
        points: 0,
      },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 20,
    question:
      "Q20. Que devez-vous faire si vous cassez un verre dans la salle à manger ?",
    options: [
      { id: 1, option: "Le signaler au jeune qui l'a utilisé", points: 0 },
      { id: 2, option: "Le jeter discrètement", points: 0 },
      {
        id: 3,
        option:
          "Le ramasser en toute sécurité, nettoyer, puis le noter dans le cahier d'incident matériel",
        points: 10,
      },
      { id: 4, option: "Appeler le chef de service", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 21,
    question:
      "Q21. Lors d'une sortie, un jeune se perd. Quelle est la première action ?",
    options: [
      { id: 1, option: "Réunir les autres jeunes", points: 0 },
      { id: 2, option: "Appeler la police", points: 0 },
      {
        id: 3,
        option:
          "Appeler le jeune s'il a un téléphone et alerter le chef de service",
        points: 10,
      },
      { id: 4, option: "Revenir au foyer chercher du renfort", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 22,
    question:
      "Q22. Un jeune revient d'une permission avec une blessure suspecte. Que faites-vous ?",
    options: [
      {
        id: 1,
        option:
          "Je note la blessure dans les transmissions et j'en informe le cadre",
        points: 10,
      },
      { id: 2, option: "Je soigne sans rien dire", points: 0 },
      { id: 3, option: "J'appelle le parent", points: 0 },
      { id: 4, option: "J'attends la réunion d'équipe", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 23,
    question:
      "Q23. Un collègue vous semble très fatigué et commet des oublis dangereux. Que faites-vous ?",
    options: [
      { id: 1, option: "Je le couvre pour éviter les problèmes", points: 0 },
      {
        id: 2,
        option: "J'en parle au jeune pour qu'il soit vigilant",
        points: 0,
      },
      {
        id: 3,
        option: "Je le note dans les transmissions et j'informe la hiérarchie",
        points: 10,
      },
      { id: 4, option: "Je le remplace systématiquement", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 24,
    question:
      "Q24. Vous trouvez un briquet dans la chambre d'un jeune de 12 ans. Que faites-vous ?",
    options: [
      { id: 1, option: "Je le garde", points: 0 },
      {
        id: 2,
        option: "Je le confisque et je le note dans le cahier de transmission",
        points: 10,
      },
      { id: 3, option: "Je le remets à l'enfant", points: 0 },
      { id: 4, option: "Je le donne à un collègue", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 25,
    question:
      "Q25. Lors d'un accompagnement au supermarché, un jeune est suspecté de vol. Que faites-vous ?",
    options: [
      { id: 1, option: "Je le laisse se débrouiller", points: 0 },
      { id: 2, option: "Je le réprimande devant tout le monde", points: 0 },
      {
        id: 3,
        option:
          "Je reste calme, je coopère avec le personnel du magasin, puis je transmets à ma hiérarchie",
        points: 10,
      },
      { id: 4, option: "Je quitte le magasin", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 26,
    question:
      "Q26. Que faire si un jeune refuse de prendre sa douche depuis plusieurs jours ?",
    options: [
      { id: 1, option: "Je le force", points: 0 },
      { id: 2, option: "Je l'ignore", points: 0 },
      {
        id: 3,
        option:
          "Je discute avec lui pour comprendre les raisons et je le signale en réunion",
        points: 10,
      },
      { id: 4, option: "J'appelle la famille", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 27,
    question: "Q27. En cas d'incendie, où trouver le plan d'évacuation ?",
    options: [
      { id: 1, option: "Dans le cahier de transmission", points: 0 },
      {
        id: 2,
        option: "Affiché dans les couloirs ou près des issues",
        points: 10,
      },
      { id: 3, option: "Dans la chambre du chef de service", points: 0 },
      { id: 4, option: "Au réfectoire", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 28,
    question: "Q28. Quel document devez-vous remplir après un incident grave ?",
    options: [
      { id: 1, option: "Cahier de liaison", points: 0 },
      { id: 2, option: "Fiche d'incident", points: 10 },
      { id: 3, option: "Cahier des menus", points: 0 },
      { id: 4, option: "Liste des présences", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 29,
    question:
      "Q29. Une jeune fille revient de l'école en pleurs et refuse de parler. Que faites-vous ?",
    options: [
      {
        id: 1,
        option: "J'attends qu'elle se calme et je propose un temps de parole",
        points: 0,
      },
      {
        id: 2,
        option:
          "Je l'accueille avec bienveillance, je lui propose un espace de parole, et je note le contexte en transmission",
        points: 10,
      },
      { id: 3, option: "Je la renvoie dans sa chambre", points: 0 },
      { id: 4, option: "Je le dis à une autre jeune", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 30,
    question: "Q30. En cas de bagarre, que dois-je faire en priorité ?",
    options: [
      { id: 1, option: "Intervenir seul et séparer physiquement", points: 0 },
      { id: 2, option: "Appeler les parents", points: 0 },
      {
        id: 3,
        option:
          "Protéger les jeunes en danger, appeler du renfort, séparer si possible sans danger",
        points: 10,
      },
      { id: 4, option: "Faire une vidéo de la scène", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 31,
    question:
      "Q31. Vous recevez une lettre d'un parent avec des propos violents. Que faites-vous ?",
    options: [
      { id: 1, option: "Je réponds avec diplomatie", points: 0 },
      { id: 2, option: "Je la jette", points: 0 },
      {
        id: 3,
        option:
          "Je la montre au chef de service et je la classe dans le dossier du jeune",
        points: 10,
      },
      { id: 4, option: "Je la lis à haute voix devant les jeunes", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 32,
    question:
      "Q32. En foyer, qui est responsable de la bonne tenue du dossier de l'enfant ?",
    options: [
      { id: 1, option: "Le juge", points: 0 },
      { id: 2, option: "L'enfant lui-même", points: 0 },
      {
        id: 3,
        option: "L'équipe éducative, sous la responsabilité du chef de service",
        points: 10,
      },
      { id: 4, option: "Le médecin scolaire", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 33,
    question: "Q33. Si un jeune quitte le foyer sans autorisation, que faire ?",
    options: [
      {
        id: 1,
        option: "Informer la hiérarchie et attendre les consignes",
        points: 10,
      },
      { id: 2, option: "Le suivre en courant", points: 0 },
      {
        id: 3,
        option: "Lui envoyer un message pour qu'il revienne",
        points: 0,
      },
      { id: 4, option: "En parler le lendemain", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 34,
    question: "Q34. Quelle est la meilleure posture physique en entretien ?",
    options: [
      { id: 1, option: "Bras croisés, regard fuyant", points: 0 },
      {
        id: 2,
        option: "Ouverture corporelle, regard direct, posture stable",
        points: 10,
      },
      {
        id: 3,
        option: "Dos tourné au jeune pour éviter le conflit",
        points: 0,
      },
      { id: 4, option: "Penché vers lui avec insistance", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 35,
    question:
      "Q35. Lorsqu'un jeune vous provoque volontairement devant ses camarades, que faites-vous ?",
    options: [
      { id: 1, option: "Vous ripostez pour garder votre autorité", points: 0 },
      { id: 2, option: "Vous le sanctionnez immédiatement", points: 0 },
      {
        id: 3,
        option:
          "Vous restez calme et vous proposez un temps d'échange en privé",
        points: 10,
      },
      { id: 4, option: "Vous quittez la pièce", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 36,
    question:
      "Q36. Un jeune arrive très agacé à table et renverse exprès son assiette. Que faites-vous ?",
    options: [
      { id: 1, option: "Vous le privez de dessert", points: 0 },
      {
        id: 2,
        option:
          "Vous contenez la situation, puis vous l'isolez pour un temps de parole",
        points: 10,
      },
      { id: 3, option: "Vous nettoyez en silence", points: 0 },
      { id: 4, option: "Vous l'ignorez", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 37,
    question:
      "Q37. Deux jeunes se moquent d'un troisième qui a du mal à lire. Quelle est votre réaction ?",
    options: [
      {
        id: 1,
        option: "Vous vous moquez aussi pour que l'ambiance reste légère",
        points: 0,
      },
      {
        id: 2,
        option:
          "Vous intervenez avec bienveillance pour faire cesser la moquerie et valoriser chacun",
        points: 10,
      },
      {
        id: 3,
        option: "Vous faites comme si vous n'aviez rien entendu",
        points: 0,
      },
      {
        id: 4,
        option: "Vous faites changer de place les jeunes moqueurs",
        points: 0,
      },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 38,
    question:
      "Q38. En rentrant d'une sortie, le jeune que vous accompagnez vous confie qu'il pense à fuguer. Que faites-vous ?",
    options: [
      {
        id: 1,
        option: "Vous lui interdisez formellement de partir",
        points: 0,
      },
      { id: 2, option: "Vous alertez la police", points: 0 },
      {
        id: 3,
        option:
          "Vous accueillez sa parole et planifiez un entretien avec l'équipe",
        points: 10,
      },
      { id: 4, option: "Vous le surveillez en cachette", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 39,
    question:
      "Q39. Lors d'un atelier cuisine, un jeune refuse d'y participer. Quelle attitude adoptez-vous ?",
    options: [
      { id: 1, option: "Vous lui donnez une sanction", points: 0 },
      {
        id: 2,
        option: "Vous l'obligez à éplucher les pommes de terre",
        points: 0,
      },
      {
        id: 3,
        option: "Vous lui proposez un autre rôle ou un espace d'observation",
        points: 10,
      },
      { id: 4, option: "Vous le laissez partir sans rien dire", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 40,
    question:
      "Q40. Un jeune vous dit que vous êtes le seul adulte qui le comprend. Que faites-vous ?",
    options: [
      { id: 1, option: "Vous le prenez dans vos bras", points: 0 },
      { id: 2, option: "Vous vous en vantez", points: 0 },
      {
        id: 3,
        option:
          "Vous accueillez la parole avec distance professionnelle et en parlez à l'équipe",
        points: 10,
      },
      { id: 4, option: "Vous passez plus de temps seul avec lui", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 41,
    question:
      "Q41. Vous entendez un jeune insulter un collègue. Que faites-vous ?",
    options: [
      { id: 1, option: "Vous insultez à votre tour", points: 0 },
      {
        id: 2,
        option: "Vous recadrez calmement et transmettez à l'équipe",
        points: 10,
      },
      { id: 3, option: "Vous ignorez", points: 0 },
      { id: 4, option: "Vous le faites s'excuser de force", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 42,
    question:
      "Q42. Vous êtes témoin d'un acte de harcèlement entre deux jeunes. Que faites-vous ?",
    options: [
      {
        id: 1,
        option: "Vous attendez de voir si cela se reproduit",
        points: 0,
      },
      {
        id: 2,
        option:
          "Vous isolez les deux jeunes et construisez une médiation avec l'équipe",
        points: 10,
      },
      { id: 3, option: "Vous transférez un des jeunes ailleurs", points: 0 },
      { id: 4, option: "Vous prévenez les parents du harceleur", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 43,
    question:
      "Q43. Un jeune vous dit qu'il est maltraité pendant ses retours en famille. Quelle est votre première réaction ?",
    options: [
      { id: 1, option: "Vous appelez la famille pour vérifier", points: 0 },
      {
        id: 2,
        option:
          "Vous l'écoutez avec attention, notez ses propos et les transmettez",
        points: 10,
      },
      {
        id: 3,
        option: "Vous lui dites que ce n'est pas votre problème",
        points: 0,
      },
      {
        id: 4,
        option: "Vous lui conseillez de ne plus rentrer chez lui",
        points: 0,
      },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 44,
    question:
      "Q44. En pleine activité, un jeune refuse soudainement de continuer. Quelle posture adoptez-vous ?",
    options: [
      { id: 1, option: "Vous insistez fortement", points: 0 },
      {
        id: 2,
        option:
          "Vous l'invitez à expliquer son choix et proposez une alternative",
        points: 10,
      },
      { id: 3, option: "Vous le menacez de sanction", points: 0 },
      { id: 4, option: "Vous l'ignorez", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 45,
    question:
      "Q45. Pendant un entretien, un jeune vous dévoile une activité illégale. Que faites-vous ?",
    options: [
      { id: 1, option: "Vous l'encouragez à continuer", points: 0 },
      {
        id: 2,
        option:
          "Vous recueillez les faits sans jugement et en informez la hiérarchie",
        points: 10,
      },
      { id: 3, option: "Vous en parlez aux autres jeunes", points: 0 },
      { id: 4, option: "Vous faites un post sur les réseaux", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 46,
    question:
      "Q46. Un jeune vous déclare qu'il veut changer de genre. Quelle est votre réaction ?",
    options: [
      { id: 1, option: "Vous en riez", points: 0 },
      {
        id: 2,
        option:
          "Vous accueillez sa parole sans jugement et en parlez avec l'équipe pour adapter l'accompagnement",
        points: 10,
      },
      { id: 3, option: "Vous refusez de l'écouter", points: 0 },
      { id: 4, option: "Vous alertez les autres jeunes", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 47,
    question:
      "Q47. Vous avez un conflit avec un collègue pendant le service. Quelle est la meilleure attitude ?",
    options: [
      { id: 1, option: "Vous réglez le conflit devant les jeunes", points: 0 },
      { id: 2, option: "Vous le menacez d'une main courante", points: 0 },
      {
        id: 3,
        option:
          "Vous attendez un moment calme pour en parler en privé ou en réunion d'équipe",
        points: 10,
      },
      { id: 4, option: "Vous transmettez à la direction par mail", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 48,
    question:
      "Q48. Le matin, un jeune refuse catégoriquement de se lever. Que faites-vous ?",
    options: [
      { id: 1, option: "Vous le tirez du lit", points: 0 },
      { id: 2, option: "Vous lui criez dessus", points: 0 },
      {
        id: 3,
        option:
          "Vous le stimulez avec bienveillance, lui proposez un temps d'échange et transmettez",
        points: 10,
      },
      { id: 4, option: "Vous l'ignorez jusqu'au déjeuner", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 49,
    question:
      "Q49. Vous êtes dans le foyer et vous sentez la tension monter entre la dizaine de jeunes présents, vos tentatives d'apaisement ne fonctionnent pas et la tension continue de monter, que faites-vous ?",
    options: [
      {
        id: 1,
        option: "Je vais chercher du soutien d'un éducateur sur un autre foyer",
        points: 0,
      },
      { id: 2, option: "Je lève la voix pour me faire respecter", points: 0 },
      {
        id: 3,
        option:
          "Je capte l'attention des jeunes sur autre chose que le conflit",
        points: 10,
      },
      {
        id: 4,
        option: "J'exécute une contention sur un des jeunes",
        points: 0,
      },
      { id: 5, option: "Je me mets discrètement à l'écart", points: 0 },
      { id: 6, option: "Je Twerk", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 50,
    question:
      "Q50. Vous emmenez un groupe de 6 jeunes au cinéma. Un refuse de mettre sa ceinture. Que faites-vous ?",
    options: [
      {
        id: 1,
        option: "J'insiste jusqu'à ce qu'il mette sa ceinture",
        points: 0,
      },
      { id: 2, option: "Je vais chercher un autre éducateur", points: 0 },
      {
        id: 3,
        option:
          "Je ne démarre pas tant que la sécurité du jeune n'est pas garantie",
        points: 10,
      },
      {
        id: 4,
        option: "Je fais très attention et je roule doucement",
        points: 0,
      },
      { id: 5, option: "Je démarre le moteur pour faire peur", points: 0 },
      {
        id: 6,
        option: "Je pars en Drift pour lui montrer la force centrifuge",
        points: 0,
      },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 51,
    question:
      "Q51. Vous entrez dans le réfectoire où un jeune en crise lance des assiettes. Que faites-vous ?",
    options: [
      { id: 1, option: "Je le maîtrise physiquement", points: 5 },
      { id: 2, option: "J'évacue les autres jeunes", points: 5 },
      { id: 3, option: "J'isole le jeune puis j'évacue les autres", points: 0 },
      {
        id: 4,
        option: "Je vais chercher du soutien puis j'isole le jeune",
        points: 0,
      },
      { id: 5, option: "J'appelle les parents du jeune", points: 0 },
      {
        id: 6,
        option: "Je cherche du soutien puis j'appelle les parents",
        points: 0,
      },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 52,
    question:
      "Q52. Il est 22h45, le surveillant de nuit n'est pas arrivé. Que faites-vous ?",
    options: [
      { id: 1, option: "Je préviens le cadre d'astreinte", points: 10 },
      {
        id: 2,
        option: "Je laisse un mot dans le cahier et je pars",
        points: 0,
      },
      {
        id: 3,
        option:
          "Je préviens les éducateurs des autres groupes et le cadre d'Astreinte",
        points: 5,
      },
      {
        id: 4,
        option:
          "Je laisse un écrit dans le cahier de transmission et je préviens les autres éducateurs",
        points: 0,
      },
      { id: 5, option: "J'appelle la police", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 53,
    question:
      "Q53. Vous voyez un jeune fuguer par la fenêtre, il est 22h30. Que faites-vous ?",
    options: [
      {
        id: 1,
        option:
          "J'essaye de convaincre le jeune de revenir et je préviens le cadre d'astreinte",
        points: 5,
      },
      { id: 2, option: "Je préviens le cadre d'astreinte", points: 5 },
      {
        id: 3,
        option: "Je sors du Foyer pour le rattraper s'il tombe",
        points: 0,
      },
      {
        id: 4,
        option: "J'essaye de convaincre le jeune de revenir",
        points: 0,
      },
      { id: 5, option: "J'appelle les autres éducateurs", points: 0 },
      { id: 6, option: "Je lui fais un cours sur la gravitation", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 54,
    question:
      "Q54. Un vendredi à 17H00, un jeune refuse d'aller chez sa mère alors que c'est prévu par le juge. Que faites-vous ?",
    options: [
      { id: 1, option: "J'essaye de comprendre pourquoi", points: 10 },
      {
        id: 2,
        option: "J'essaye de l'obliger à aller chez sa mère",
        points: 0,
      },
      {
        id: 3,
        option: "J'essaye de le convaincre d'aller chez sa mère absolument",
        points: 0,
      },
      {
        id: 4,
        option: "J'essaye de comprendre pourquoi puis de le convaincre",
        points: 0,
      },
      {
        id: 5,
        option:
          "J'essaye de comprendre pourquoi puis je l'oblige à effectuer la décision judiciaire",
        points: 0,
      },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 55,
    question:
      "Q55. Quelle est la différence entre un veilleur de nuit et un surveillant de nuit ?",
    options: [
      {
        id: 1,
        option:
          "Le veilleur de nuit peut dormir, le surveillant de nuit ne peut pas dormir",
        points: 10,
      },
      {
        id: 2,
        option:
          "Le surveillant de nuit peut dormir, le veilleur de nuit ne peut pas dormir",
        points: 0,
      },
      { id: 3, option: "C'est exactement la même chose", points: 0 },
      {
        id: 4,
        option:
          "Ils n'ont tous les deux pas le droit de dormir mais le surveillant de nuit doit faire des nuits debout",
        points: 0,
      },
      {
        id: 5,
        option:
          "Ils ont tous les deux le droit de dormir mais les transmissions ne sont pas les mêmes",
        points: 0,
      },
      {
        id: 6,
        option: "Le veilleur veille, le surveillant surveille",
        points: 0,
      },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 56,
    question: "Q56. A quel rythme ont lieu les réunions d'équipe ?",
    options: [
      { id: 1, option: "Une fois par mois", points: 0 },
      { id: 2, option: "Une fois par semaine", points: 10 },
      { id: 3, option: "Cela dépend du planning", points: 0 },
      { id: 4, option: "La réponse D", points: 0 },
      { id: 5, option: "Cela dépend des analyses de pratique", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 57,
    question:
      "Q57. Vous êtes surveillant de nuit, seul au rez-de-chaussée, vous entendez du bruit au 2e étage. Escalier ou ascenseur ?",
    options: [
      { id: 1, option: "Ascenseur", points: 0 },
      { id: 2, option: "Escalier", points: 10 },
      {
        id: 3,
        option: "J'escalade la façade... je suis un/une rebelle",
        points: 0,
      },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 58,
    question: 'Q58. Qu\'est-ce que le "représentant légal" ?',
    options: [
      { id: 1, option: "Ce sont les parents", points: 5 },
      { id: 2, option: "C'est le juge", points: 5 },
      { id: 3, option: "C'est un inspecteur de l'ASE", points: 0 },
      {
        id: 4,
        option: "La loi est responsable et le représentant légal",
        points: 0,
      },
      { id: 5, option: "C'est le juge des enfants uniquement", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 59,
    question:
      "Q59. Vous êtes référent d'un jeune de 14 ans, il rentre de l'école avec un document à signer, une autorisation de sortie au zoo avec sa classe sous la responsabilité de son professeur. En tant que référent, pouvez-vous signer cette autorisation ?",
    options: [
      {
        id: 1,
        option:
          "Non, sauf si vous avez une délégation écrite du représentant légal",
        points: 10,
      },
      { id: 2, option: "Oui, car vous êtes son référent", points: 0 },
      { id: 3, option: "Oui, car c'est une sortie scolaire", points: 0 },
      {
        id: 4,
        option: "Non, uniquement le chef de service peut le faire",
        points: 0,
      },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 60,
    question: "Q60. Qu'est-ce qu'une MECS ?",
    options: [
      { id: 1, option: "Maison d'Enfants à Caractère Social", points: 10 },
      { id: 2, option: "Maison d'Enfants sous Contrôle Social", points: 0 },
      { id: 3, option: "Médiation Educative et Crise Scolaire", points: 0 },
      { id: 4, option: "Module Educatif de Coordination Sociale", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 61,
    question: "Q61. À quel moment ont lieu les transmissions ?",
    options: [
      { id: 1, option: "À chaque changement d'équipe", points: 5 },
      { id: 2, option: "À chaque prise de service", points: 5 },
      { id: 3, option: "Une fois par jour uniquement", points: 0 },
      { id: 4, option: "Lors des réunions d'équipe", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 62,
    question:
      "Q62. Vous êtes de soirée dans un foyer accueillant des jeunes de 15 à 17 ans. À 23h un jeune demande à sortir fumer une cigarette, bien que cela soit interdit. Que faites-vous ?",
    options: [
      {
        id: 1,
        option:
          "Je l'autorise à titre exceptionnel en expliquant que c'est une dérogation unique",
        points: 10,
      },
      { id: 2, option: "Je lui dis non fermement", points: 0 },
      {
        id: 3,
        option: "Je le sanctionne pour non-respect du règlement",
        points: 0,
      },
      { id: 4, option: "Je le laisse sortir sans rien dire", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 63,
    question:
      "Q63. Quelle est la première chose à faire au moment de sa prise de service ?",
    options: [
      { id: 1, option: "Prendre connaissance des transmissions", points: 10 },
      { id: 2, option: "Faire le tour du foyer", points: 0 },
      { id: 3, option: "Dire bonjour aux jeunes", points: 0 },
      { id: 4, option: "Boire un café et se mettre à jour", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 64,
    question:
      "Q64. Un jeune de 16 ans se plaint de maux de tête depuis plusieurs heures et vous réclame un Doliprane. Pouvez-vous lui donner ?",
    options: [
      { id: 1, option: "Non", points: 5 },
      { id: 2, option: "Oui, il est mineur mais en souffrance", points: 0 },
      { id: 3, option: "Oui, si vous le jugez nécessaire", points: 0 },
      {
        id: 4,
        option: "Oui, s'il a déjà pris ce médicament auparavant",
        points: 0,
      },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 65,
    question:
      "Q65. Sous quelle condition pouvez-vous donner un Doliprane à un jeune ?",
    options: [
      { id: 1, option: "Avec une ordonnance préalable du médecin", points: 5 },
      {
        id: 2,
        option: "Avec l'accord du médecin régulateur du 115",
        points: 5,
      },
      { id: 3, option: "Si le chef de service vous y autorise", points: 0 },
      { id: 4, option: "Si le jeune vous le demande poliment", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 66,
    question:
      "Q66. Dans l'échelle hiérarchique, est-ce que le coordinateur est au-dessus ou en dessous du chef de service ?",
    options: [
      { id: 1, option: "En dessous du chef de service", points: 10 },
      { id: 2, option: "Au-dessus du chef de service", points: 0 },
      { id: 3, option: "À égalité avec le chef de service", points: 0 },
      { id: 4, option: "Cela dépend de l'établissement", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 67,
    question:
      "Q67. Lors d'une activité extérieure avec les jeunes, vous perdez votre trousseau de clés contenant votre clé professionnelle. Que devez-vous faire ?",
    options: [
      {
        id: 1,
        option: "Informer immédiatement le chef de service",
        points: 10,
      },
      {
        id: 2,
        option: "Continuer l'activité comme si de rien n'était",
        points: 0,
      },
      {
        id: 3,
        option: "Attendre d'avoir fini la journée pour signaler la perte",
        points: 0,
      },
      { id: 4, option: "Prévenir uniquement un collègue", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 68,
    question: "Q68. Que veut dire ASE ?",
    options: [
      { id: 1, option: "Aide Sociale à l'Enfance", points: 10 },
      { id: 2, option: "Appui Scolaire et Éducatif", points: 0 },
      { id: 3, option: "Action Solidaire Éducative", points: 0 },
      { id: 4, option: "Accompagnement des Services Educatifs", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 69,
    question:
      "Q69. Appel du parent (père ou mère) qui veut avoir son fils de 11 ans au téléphone, que dois-je vérifier au préalable ?",
    options: [
      { id: 1, option: "L'autorisation du juge", points: 10 },
      { id: 2, option: "Si le téléphone est sur écoute", points: 0 },
      { id: 3, option: "Si j'ai l'autorisation du chef de service", points: 0 },
      { id: 4, option: "J'ai l'autorisation de l'ASE", points: 5 },
      { id: 5, option: "Si je suis sur l'ordonnance 45", points: 0 },
      { id: 6, option: "Si le jeune est au OPP", points: 0 },
      { id: 7, option: "Si le jeune est AP", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 70,
    question: "Q70. Qu'est-ce qu'un IME ?",
    options: [
      { id: 1, option: "Institut de milieu éducatif", points: 0 },
      { id: 2, option: "Institut maternel éducatif", points: 0 },
      { id: 3, option: "Institut médico-éducatif", points: 10 },
      { id: 4, option: "Institut mère enfants", points: 0 },
      { id: 5, option: "Immersion en milieu éducatif", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 71,
    question:
      "Q71. Suite à un évènement particulier, vous devez rédiger une note d'incident. À qui transmettez-vous cette note ?",
    options: [
      { id: 1, option: "Au chef de service", points: 5 },
      { id: 2, option: "Aux éducateurs", points: 0 },
      { id: 3, option: "Au coordinateur", points: 5 },
      {
        id: 4,
        option: "Au coordinateur ou à défaut au chef de service",
        points: 9,
      },
      {
        id: 5,
        option: "Au chef de service ou à défaut au coordinateur",
        points: 10,
      },
      { id: 6, option: "Au premier ministre", points: 0 },
      { id: 7, option: "À Bernard Montiel", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 72,
    question:
      "Q72. Un jeune se blesse gravement lors d'une activité « cuisine ». Que dois-je fournir aux pompiers dans le cadre de son hospitalisation ?",
    options: [
      { id: 1, option: "La carte vitale", points: 10 },
      {
        id: 2,
        option:
          "La carte vitale, l'ordonnance de traitement, la fiche de renseignements et l'autorisation d'opérer",
        points: 10,
      },
      { id: 3, option: "Réponse libre", points: 0 },
      { id: 4, option: "Le dossier médical du jeune", points: 5 },
      { id: 5, option: "La carte d'identité", points: 0 },
      {
        id: 6,
        option: "L'ordonnance de renseignements ou l'autorisation d'opérer",
        points: 8,
      },
      { id: 7, option: "L'ordonnance de placement", points: 0 },
      { id: 8, option: "Rien du tout, c'est une urgence", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 73,
    question:
      "Q73. Qu'est-ce qu'une ordonnance de placement provisoire (OPP) ?",
    options: [
      {
        id: 1,
        option:
          "C'est le document établi par le juge des enfants qui ordonne le placement",
        points: 10,
      },
      { id: 2, option: "C'est une ordonnance de médecin", points: 0 },
      { id: 3, option: "C'est le placement du jeûne", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
  {
    id: 74,
    question: "Q74. Qu'est-ce qu'une visite médiatisée ?",
    options: [
      {
        id: 1,
        option: "C'est lorsque les médias viennent filmer le centre",
        points: 0,
      },
      {
        id: 2,
        option: "C'est lorsqu'un médiateur de l'enfance intervient",
        points: 0,
      },
      {
        id: 3,
        option:
          "C'est un droit de visite entre un parent et un enfant soumis à la présence d'un tiers",
        points: 10,
      },
      {
        id: 4,
        option: "C'est une visite de courtoisie d'un parent",
        points: 5,
      },
      {
        id: 5,
        option: "C'est la visite d'un éducateur dans un établissement",
        points: 1,
      },
      { id: 6, option: "C'est la visite d'un inspecteur", points: 0 },
    ],
    category: "SENS PRATIQUE",
  },
  {
    id: 75,
    question:
      "Q75. Vous médiatisez une visite entre un jeune de 12 ans et sa mère. Celle-ci lui fait des reproches et son état se dégrade. Que faites-vous ?",
    options: [
      { id: 1, option: "J'interromps l'entretien", points: 10 },
      { id: 2, option: "Je ne fais rien", points: 0 },
      {
        id: 3,
        option: "Je fais des reproches à la mère devant le jeune",
        points: 0,
      },
      {
        id: 4,
        option: "Je fais des reproches une fois seul avec la mère",
        points: 0,
      },
      { id: 5, option: "Je sors le jeune de la réunion", points: 5 },
      { id: 6, option: "Je danse la Macarena", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 76,
    question:
      "Q76. Citez 3 types de métiers que vous pouvez rencontrer dans un foyer de la protection de l'enfance.",
    options: [
      { id: 1, option: "Maîtresse de maison", points: 5 },
      { id: 2, option: "Plombier", points: 0 },
      { id: 3, option: "Juge des enfants", points: 0 },
      { id: 4, option: "Psychologue", points: 5 },
      { id: 5, option: "Éducateur sportif", points: 5 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 77,
    question:
      "Q77. Comment un chef de service peut-il savoir quels éducateurs ont utilisé un véhicule du service et pour quelle utilité ?",
    options: [
      {
        id: 1,
        option: "En regardant sur le carnet de bord de la voiture",
        points: 10,
      },
      { id: 2, option: "En regardant le kilométrage", points: 0 },
      { id: 3, option: "Avec le badge des éducateurs", points: 0 },
      { id: 4, option: "En lui demandant", points: 0 },
    ],
    category: "CONNAISSANCES DE TERRAIN",
  },
  {
    id: 78,
    question:
      "Q78. L'ampoule dans la chambre d'un jeune de 17 ans a grillé. Qui peut la changer ?",
    options: [
      { id: 1, option: "N'importe quel chef de service", points: 1 },
      {
        id: 2,
        option:
          "Une personne ayant au moins l'habilitation électrique niveau 1",
        points: 10,
      },
      { id: 3, option: "N'importe quel éducateur", points: 0 },
      { id: 4, option: "Toutes les personnes ayant une ampoule", points: 0 },
      { id: 5, option: "N'importe quel adulte", points: 0 },
      { id: 6, option: "Un électricien uniquement", points: 8 },
      { id: 7, option: "Un jeune de moins de 18 ans ou un adulte", points: 0 },
    ],
    category: "CONNAISSANCES THÉORIQUES",
  },
];

export const getQuizMetaConfig = (submitted: boolean, score: number) => {
  if (!submitted) {
    return {
      cardBgColor: "#FAFAFA",
      title: "Quiz Overview",
      icon: <QuizIcon />,
      fields: [
        { title: "Total Questions", value: quizData.length },
        { title: "Passing Score", value: "70%" },
      ],
      paragraphText: "Take the quiz to test your knowledge and earn points.",
    };
  } else {
    if (score >= 70) {
      return {
        cardBgColor: "#F0FDF4",
        title: "Congratulations! You passed the quiz.",
        icon: <CircleIcon color="success" fontSize="inherit" />,
        fields: [
          { title: "You scored", value: `${Math.round(score)}%` },
          { title: "Passing Score", value: "70%" },
        ],
        paragraphText:
          "You have passed the quiz. You can now unlock new missions as you progress.",
      };
    } else {
      return {
        cardBgColor: "#FDF2F2",
        title: "Oops! You failed the quiz.",
        icon: <CircleIcon color="error" fontSize="inherit" />,
        fields: [
          { title: "You scored", value: `${Math.round(score)}%` },
          { title: "Passing Score", value: "70%" },
        ],
        paragraphText:
          "You have failed the quiz. You can try again to improve your score.",
      };
    }
  }
};