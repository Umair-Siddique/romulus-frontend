import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Read localStorage values inside useEffect to get fresh values
    const user = localStorage.getItem("romulus-user");
    const profile = localStorage.getItem("romulus-has-profile");
    const hasProfile = profile ? JSON.parse(profile) : false;

    // If no user, redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    // If user has profile, redirect to home
    if (hasProfile) {
      navigate("/");
      return;
    } else {
      navigate("/create-profile");
      return;
    }

    // If user exists but no profile, stay on create-profile page
  }, [navigate]);

  return <div>Home</div>;
};
