import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "#context";

export const Branches = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { role } = user;

  return <div>Branches</div>;
};
