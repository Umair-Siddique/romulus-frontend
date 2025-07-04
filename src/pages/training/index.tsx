import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Training = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>Training</div>;
};
