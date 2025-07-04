import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const EducatorDetails = () => {
   const { user } = useUserContext();

  if (!user) null; // handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>EducatorDetails</div>;
};
