import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

export const OrganizationDetails = () => {
  const { user } = useUserContext();

  const { role } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  return <div>OrganizationDetails</div>;
};
