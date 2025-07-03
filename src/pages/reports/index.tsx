import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Reports = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Reports</div>;
};
