import { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Missions = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>Hi, {role}</div>;
};
