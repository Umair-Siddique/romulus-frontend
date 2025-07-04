import { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const FindEducator = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>FindEducator</div>;
};
