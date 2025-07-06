import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

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
