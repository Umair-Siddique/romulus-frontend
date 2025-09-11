import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { TrainingIntroduction, QuizAndVideosNav } from "#components";
import { useUserContext } from "#context";

export const Training = () => {
  const { user } = useUserContext();
  const role = user?.role;

  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (role && role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  const steps = {
    1: <TrainingIntroduction setStep={(step) => setStep(step)} />,
    2: <QuizAndVideosNav />,
  };

  return steps[step] || null;
};
