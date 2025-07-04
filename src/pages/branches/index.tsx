import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context";

export const Branches = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Branches</div>;
};
