import React, { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div>
      Welcome to the Dashboard, {user?.role || "User"}!
    </div>
  );
};
