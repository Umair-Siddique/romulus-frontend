import { useEffect } from "react";
import { useUserContext } from "#context";
import { useNavigate } from "react-router";

export const Chats = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { role } = user;

  return <div>Chats</div>;
};
