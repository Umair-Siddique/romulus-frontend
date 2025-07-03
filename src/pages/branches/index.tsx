import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Branches = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Branches</div>;
};
