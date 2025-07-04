import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Organizations = () => {
   const { user } = useUserContext();

  if (!user) null; // handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Organizations</div>;
};
