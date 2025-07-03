import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Chats = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Chats</div>;
};
