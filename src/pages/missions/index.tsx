import { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Missions = () => {
   const { user } = useUserContext();
  if (!user) {
    return null; // or handle loading state
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Hi, {user?.role}</div>;
};
