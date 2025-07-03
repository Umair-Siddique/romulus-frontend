import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.role || user.role !== "admin") {
      navigate("/missions", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      {user.role === "admin" ? (
        <h1>Welcome to the Admin Dashboard</h1>
      ) : (
        <h1>Welcome to the User Dashboard</h1>
      )}
    </div>
  );
};
