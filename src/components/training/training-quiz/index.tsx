import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { Button, Alert, Stack, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { MCQ } from "./MCQ";
import { Option } from "#types";
import { Modal, PageMeta } from "#components";
import { QuizMeta } from "./QuizMeta";
import { quizData, getQuizMetaConfig } from "#lib";
import { useUpdate } from "@refinedev/core";
import { useUserContext } from "#context";

const QUESTIONS_PER_PAGE = 6;

export const TrainingQuiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { educatorId } = user || {};

  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, Option | null>
  >({});
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const totalPages = Math.ceil(quizData.length / QUESTIONS_PER_PAGE);

  const handleSelection = useCallback((mcqId: number, optionId: number) => {
    const mcq = quizData.find((q) => q.id === mcqId);
    if (!mcq) return;
    const option = mcq.options.find((o) => o.id === optionId);
    if (!option) return;
    setSelectedOptions((prev) => ({ ...prev, [mcqId]: option }));
    setShowValidationError(false); // hide error once user selects
  }, []);

  const totalScore = quizData.reduce(
    (acc, mcq) =>
      acc + (mcq.options.find((opt) => opt.points > 0)?.points || 0),
    0
  );

  const allQuestionsAnswered =
    Object.keys(selectedOptions).length === quizData.length;

  const { mutate } = useUpdate({
    resource: "educators",
  });

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      setShowValidationError(true);
      return;
    }

    const userScore = Object.values(selectedOptions).reduce(
      (acc, opt) => acc + (opt?.points || 0),
      0
    );

    const attainedScore = (userScore / totalScore) * 100;

    setScore(attainedScore);

    if (attainedScore >= 70) {
      mutate({
        id: educatorId,
        values: {
          trainingStatus: "completed",
        },
      });
      setShowSuccessModal(true);
    }

    setSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setScore(0);
    setSubmitted(false);
    setShowValidationError(false);
    setCurrentPage(0);
  };

  const handleGoToMissions = () => {
    navigate("/dashboard");
  };

  const currentQuizMetaConfig = getQuizMetaConfig(submitted, score);

  // Pagination slice
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = quizData.slice(startIndex, endIndex);

  // Validation for current page
  const currentPageAnswered = currentQuestions.every(
    (q) => selectedOptions[q.id]
  );

  return (
    <>
      <PageMeta
        title="Quiz de Connaissances – Testez Vos Compétences"
        description="Mettez-vous au défi avec notre quiz interactif, gagnez des points et débloquez de nouvelles missions au fur et à mesure de votre progression."
      />
      {/* Quiz Overview / Result Card */}
      <QuizMeta quizMetaConfig={currentQuizMetaConfig} />
      {/* Quiz Questions (Paginated by 6) */}
      {!submitted &&
        currentQuestions.map((mcq) => (
          <MCQ
            key={mcq.id}
            id={mcq.id}
            question={mcq.question}
            options={mcq.options}
            selectedOption={selectedOptions[mcq.id]?.id || null}
            handleSelection={handleSelection}
            submitted={submitted}
          />
        ))}
      {/* Navigation / Submit */}
      {!submitted && (
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Précédent
          </Button>

          {currentPage < totalPages - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentPage((p) => p + 1)}
              sx={{ backgroundColor: theme.palette.primary.main }}
              disabled={!currentPageAnswered} // ✅ must answer all 6
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!currentPageAnswered} // ✅ must answer last page too
            >
              Soumettre
            </Button>
          )}
        </Stack>
      )}
      {/* After submission → show action buttons */}
      {submitted && (
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          {score >= 70 ? (
            <Button
              variant="contained"
              onClick={handleGoToMissions}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Aller aux Missions
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleRetake}>
              Reprendre le Quiz
            </Button>
          )}
        </Stack>
      )}
      {showValidationError && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Veuillez répondre à toutes les questions avant de soumettre.
        </Alert>
      )}
      {/* Progress indicator */}
      {!submitted && (
        <Box sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
          Page {currentPage + 1} of {totalPages} |{" "}
          {Object.keys(selectedOptions).length} / {quizData.length} answered
        </Box>
      )}

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onSubmit={() => setShowSuccessModal(false)}
        title="🎉 Félicitations, Champion!"
        description="Vous avez réussi le quiz avec brio. Vos connaissances ouvrent la voie à de nouvelles missions - continuons sur cette lancée!"
        icon={<CheckCircleOutlineIcon color="success" sx={{ fontSize: 52 }} />}
        hasButton={false}
        hasButton1={true}
        button1Text="Aller aux Missions"
        button1OnClick={handleGoToMissions}
      />
    </>
  );
};
