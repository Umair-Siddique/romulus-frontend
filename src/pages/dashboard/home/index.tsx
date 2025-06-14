import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const profile = localStorage.getItem("has-profile");

export const Home = () => {
  const hasProfile = profile ? Boolean(profile) : false;

  const navigate = useNavigate();

  useEffect(() => {
    !hasProfile && navigate("/create-profile");
  }, []);

  return <div>Home</div>;
};
