import { useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { Button, Alert, Stack, Box, Typography, Card, CardContent } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Quiz as QuizIcon } from "@mui/icons-material";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { MCQ } from "./MCQ";
import { Option } from "#types";
import { Modal, PageMeta } from "#components";
import { QuizMeta } from "./QuizMeta";
import { quizData, getQuizMetaConfig } from "#lib";
import { useUpdate, useOne } from "@refinedev/core";
import { useUserContext } from "#context";

const QUESTIONS_PER_PAGE = 6;

// Define category labels
const CATEGORY_LABELS: Record<string, string> = {
  "CONNAISSANCES THÉORIQUES": "Connaissances Théoriques",
  "CONNAISSANCES DE TERRAIN": "Connaissances de Terrain",
  "SENS PRATIQUE": "Sens Pratique"
};

// Define category colors for charts
const CATEGORY_COLORS: Record<string, string> = {
  "CONNAISSANCES THÉORIQUES": "#FF6B6B",
  "CONNAISSANCES DE TERRAIN": "#4ECDC4",
  "SENS PRATIQUE": "#45B7D1"
};

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
  const [categoryResults, setCategoryResults] = useState<Record<string, any>>({});

  // Group questions by category
  const questionsByCategory = quizData.reduce((acc, question) => {
    const category = question.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, typeof quizData>);

  // Get all categories
  const categories = Object.keys(questionsByCategory);

  // Flatten all questions for pagination
  const allQuestions = quizData;

  const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

  const handleSelection = useCallback((mcqId: number, optionId: number) => {
    const mcq = allQuestions.find((q) => q.id === mcqId);
    if (!mcq) return;
    const option = mcq.options.find((o) => o.id === optionId);
    if (!option) return;
    setSelectedOptions((prev) => ({ ...prev, [mcqId]: option }));
    setShowValidationError(false); // hide error once user selects
  }, []);

  const totalScore = allQuestions.reduce(
    (acc, mcq) =>
      acc + (mcq.options.find((opt) => opt.points > 0)?.points || 0),
    0
  );

  const allQuestionsAnswered =
    Object.keys(selectedOptions).length === allQuestions.length;

  const { data: educatorDataRaw, refetch } = useOne({
    resource: "educators",
    id: educatorId,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const previousAttempts = educatorDataRaw?.data?.quizAttempts || [];

  const { mutate, isLoading } = useUpdate({
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

    // Calculate detailed results by category
    const categoryResults: Record<string, any> = {};

    // Calculate results for each category
    Object.entries(questionsByCategory).forEach(([category, questions]) => {
      const maxScore = questions.reduce(
        (acc, q) => acc + (q.options.find(opt => opt.points > 0)?.points || 0),
        0
      );

      let correctAnswers = 0;
      let totalQuestions = questions.length;

      questions.forEach(q => {
        const selectedOption = selectedOptions[q.id];
        if (selectedOption && selectedOption.points > 0) {
          correctAnswers++;
        }
      });

      const userCategoryScore = questions.reduce(
        (acc, q) => acc + (selectedOptions[q.id]?.points || 0),
        0
      );

      const categoryPercentage = maxScore > 0 ? (userCategoryScore / maxScore) * 100 : 0;

      categoryResults[category] = {
        correctAnswers,
        totalQuestions,
        score: userCategoryScore,
        maxScore,
        percentage: categoryPercentage
      };
    });

    setCategoryResults(categoryResults);
    setScore(attainedScore);

    const passed = attainedScore >= 70;

    if (educatorId) {
      mutate({
        id: educatorId,
        values: {
          trainingStatus: passed ? "completed" : undefined,
          quizResult: {
            score: attainedScore,
            passed: passed,
            date: new Date(),
          },
        },
      }, {
        onSuccess: () => {
          // Refresh the educator data to update the line chart
          setTimeout(() => {
            refetch();
          }, 1000);
        }
      });
    }

    if (passed) {
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
    setCategoryResults({});
  };

  const handleGoToMissions = () => {
    navigate("/dashboard");
  };

  // Pagination slice
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = allQuestions.slice(startIndex, endIndex);

  // Validation for current page
  const currentPageAnswered = currentQuestions.every(
    (q) => selectedOptions[q.id]
  );

  // Custom quiz meta config for categorized results
  const getCategorizedQuizMetaConfig = (submitted: boolean, score: number) => {
    if (!submitted) {
      return {
        cardBgColor: "#FAFAFA",
        title: "Aperçu du quiz",
        icon: <QuizIcon />,
        fields: [
          { title: "Nombre total de questions", value: allQuestions.length },
          { title: "Score requis", value: "70%" },
        ],
        paragraphText: "Passez le quiz pour tester vos connaissances et gagner des points.",
      };
    } else {
      // Calculate total correct answers
      const totalCorrectAnswers = Object.values(categoryResults).reduce(
        (acc, cat: any) => acc + (cat.correctAnswers || 0),
        0
      );

      if (score >= 70) {
        return {
          cardBgColor: "#F0FDF4",
          title: "Félicitations ! Vous avez réussi le quiz.",
          icon: <CheckCircleOutlineIcon color="success" fontSize="inherit" />,
          fields: [
            { title: "Nombre total de questions", value: allQuestions.length },
            { title: "Réponses correctes", value: totalCorrectAnswers },
            { title: "Score global", value: `${Math.round(score)}%` },
            { title: "Score requis", value: "70%" },
          ],
          paragraphText:
            "Vous avez réussi le quiz. Vous pouvez maintenant débloquer de nouvelles missions au fur et à mesure de votre progression.",
        };
      } else {
        return {
          cardBgColor: "#FDF2F2",
          title: "Oups ! Vous avez échoué au quiz.",
          icon: <CheckCircleOutlineIcon color="error" fontSize="inherit" />,
          fields: [
            { title: "Nombre total de questions", value: allQuestions.length },
            { title: "Réponses correctes", value: totalCorrectAnswers },
            { title: "Score global", value: `${Math.round(score)}%` },
            { title: "Score requis", value: "70%" },
          ],
          paragraphText:
            "Vous avez échoué au quiz. Vous pouvez réessayer pour améliorer votre score.",
        };
      }
    }
  };

  const currentQuizMetaConfig = getCategorizedQuizMetaConfig(submitted, score);

  // Prepare data for pie chart (using French labels for charts)
  const pieChartData = categories.map(category => ({
    name: CATEGORY_LABELS[category] || category, // Using French labels for charts
    value: categoryResults[category]?.percentage || 0,
    color: CATEGORY_COLORS[category] || "#8884d8"
  }));



  return (
    <>
      <PageMeta
        title="Quiz de Connaissances – Testez Vos Compétences"
        description="Mettez-vous au défi avec notre quiz interactif, gagnez des points et débloquez de nouvelles missions au fur et à mesure de votre progression."
      />
      {/* Quiz Overview / Result Card */}
      <Card sx={{ bgcolor: currentQuizMetaConfig?.cardBgColor, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {currentQuizMetaConfig?.icon} {currentQuizMetaConfig?.title}
              </Typography>

              {/* Fields in pairs (heading and value) arranged two by two */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {/* First pair: Total Questions and Correct Answers */}
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography color="textSecondary" sx={{ fontWeight: "bold", minWidth: "220px" }}>
                      Nombre total de questions:
                    </Typography>
                    <Typography>{currentQuizMetaConfig?.fields[0]?.value}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography color="textSecondary" sx={{ fontWeight: "bold", minWidth: "220px" }}>
                      Réponses correctes:
                    </Typography>
                    <Typography>{currentQuizMetaConfig?.fields[1]?.value}</Typography>
                  </Box>
                </Box>

                {/* Second pair: Overall Score and Passing Score */}
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography color="textSecondary" sx={{ fontWeight: "bold", minWidth: "220px" }}>
                      Score global:
                    </Typography>
                    <Typography>{currentQuizMetaConfig?.fields[2]?.value}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography color="textSecondary" sx={{ fontWeight: "bold", minWidth: "220px" }}>
                      Score requis:
                    </Typography>
                    <Typography>{currentQuizMetaConfig?.fields[3]?.value}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Retake button for failed quizzes */}
            {submitted && score < 70 && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleRetake}
                sx={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
              >
                Reprendre le Quiz
              </Button>
            )}
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {currentQuizMetaConfig?.paragraphText}
          </Typography>
        </CardContent>
      </Card>

      {/* Category Results - shown after submission */}
      {submitted && (
        <>
          {/* Charts */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mt: 3 }}>
            {/* Pie Chart */}
            <Card sx={{ flex: 1, p: 2 }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Pourcentage"]} />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Line Chart - Progress History */}
            <Card sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Progression des Scores (Derniers 10 essais)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    ...previousAttempts.map((attempt: any, index: number) => ({
                      name: `Essai ${index + 1}`,
                      score: attempt.score,
                    })),
                    {
                      name: `Essai ${previousAttempts.length + 1}`,
                      score: Math.round(score),
                      current: true // Mark current attempt
                    }
                  ].slice(-10)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Score"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    name="Score (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Box>
        </>
      )}

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
      {submitted && score >= 70 && (
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleGoToMissions}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            Aller aux Missions
          </Button>
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
          Page {currentPage + 1} sur {totalPages} |{" "}
          {Object.keys(selectedOptions).length} / {allQuestions.length} répondues
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