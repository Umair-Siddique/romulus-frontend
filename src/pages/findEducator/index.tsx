import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

export const FindEducator = () => {
  const { user } = useUserContext();

  const { role } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>FindEducator</div>;
};
