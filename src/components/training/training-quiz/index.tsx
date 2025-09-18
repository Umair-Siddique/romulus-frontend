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
        title="Knowledge Quiz – Test Your Skills"
        description="Challenge yourself with our interactive quiz, earn points, and unlock new missions as you progress."
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
            Previous
          </Button>

          {currentPage < totalPages - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentPage((p) => p + 1)}
              sx={{ backgroundColor: theme.palette.primary.main }}
              disabled={!currentPageAnswered} // ✅ must answer all 6
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!currentPageAnswered} // ✅ must answer last page too
            >
              Submit
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
              Go to Missions
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleRetake}>
              Retake Quiz
            </Button>
          )}
        </Stack>
      )}
      {showValidationError && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Please answer all questions before submitting.
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
        title="🎉 Congratulations, Champion!"
        description="You’ve successfully completed the quiz with flying colors. Your knowledge unlocks the path to new missions — let’s keep the momentum going!"
        icon={<CheckCircleOutlineIcon color="success" sx={{ fontSize: 52 }} />}
        hasButton={false}
        hasButton1={true}
        button1Text="Go to Missions"
        button1OnClick={handleGoToMissions}
      />
    </>
  );
};
