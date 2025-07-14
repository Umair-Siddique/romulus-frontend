import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

export const Missions = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { role } = user;

  return <div>Hi, {role}</div>;
};
