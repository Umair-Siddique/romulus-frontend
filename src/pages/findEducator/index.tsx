import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const FindEducator = () => {
   const { user } = useUserContext();
  if (!user) {
    return null; // or handle loading state
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>FindEducator</div>;
};
