import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

export const OrganizationDetails = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { role } = user;

  return <div>OrganizationDetails</div>;
};
