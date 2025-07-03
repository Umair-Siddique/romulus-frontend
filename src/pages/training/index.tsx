import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Training = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Training</div>;
};
