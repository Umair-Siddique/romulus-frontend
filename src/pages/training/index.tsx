import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

export const Training = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { role } = user;

  return <div>Training</div>;
};
