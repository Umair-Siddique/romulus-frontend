import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "#context";
import { Theme, useTheme } from "@mui/material";

export const Branches = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Branches</div>;
};
