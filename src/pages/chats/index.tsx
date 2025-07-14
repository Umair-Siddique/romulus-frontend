import { useEffect } from "react";
import { useUserContext } from "#context";
import { useNavigate } from "react-router";
import { Theme, useTheme } from "@mui/material";

export const Chats = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Chats</div>;
};
