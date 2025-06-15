import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";

import { PageHeader, PageBody } from "../../../components/createProfile";

export const CreateProfile = () => {
  const [role, setRole] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    // If not logged in, redirect to login page
    const user = localStorage.getItem("romulus-user");
    const isLoggedIn = Boolean(user);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Check if the user has already created a profile
    // If yes, redirect to the dashboard
    const profile = localStorage.getItem("has-profile");
    const hasProfile = Boolean(profile);

    if (!hasProfile) {
      navigate("/");
      return;
    }

    // Determine the steps based on user role
    const parsedUser = user ? JSON.parse(user) : null;
    const userRole = parsedUser?.role;

    setRole(userRole);
  }, [navigate]);

  return (
    <Box>
      {/* Page Header */}
      <PageHeader />

      {/* Page Body */}
      {role && <PageBody role={role} />}
    </Box>
  );
};
