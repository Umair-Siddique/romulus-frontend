import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../../context";

export const Home = () => {
  const { role } = useUserContext();

  console.log("User role in Home:", role);

  return <div>Hey, {role}</div>;
};
