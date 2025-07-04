import { useEffect } from "react";
import { useUserContext } from "../../context";
import { useNavigate } from "react-router";

export const EducatorDetails = () => {
  const { user } = useUserContext();

  const { role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>EducatorDetails</div>;
};
