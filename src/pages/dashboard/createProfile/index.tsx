import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export const CreateProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("romulus-user");
    const hasProfile = JSON.parse(
      localStorage.getItem("has-profile") || "false"
    );
    const parsedUser = userString ? JSON.parse(userString) : null;

    hasProfile && navigate("/");

    console.log("Parsed User:", parsedUser);
  }, []);
  return <div>CreateProfile</div>;
};
