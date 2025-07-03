import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Training = () => {
   const { user } = useUserContext();
  if (!user) {
    return null; // or handle loading state
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Training</div>;
};
