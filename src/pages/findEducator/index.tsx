import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import { useUserContext } from "#context";
import { useList } from "@refinedev/core";
import Leaflet from "./LeafLet";

export const FindEducator = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useList({
    resource: "educators/nearby",
    filters: [
      {
        field: "coordinates",
        operator: "eq",
        value: location.state?.coordinates.join(","),
      },
      {
        field: "skills",
        operator: "eq",
        value: location.state?.skills.join(","),
      },
      { field: "distance", operator: "eq", value: 5 },
    ],
    queryOptions: {
      enabled: !!location.state?.coordinates && !!location.state?.skills,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  });

  const { role } = user;

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    // Capture and log the state passed from CreateMission component
    if (location.state) {
      console.log("State received from CreateMission:", location.state);
      console.log("Coordinates:", location.state.coordinates);
      console.log("Skills:", location.state.skills);
    } else {
      console.log("No state received");
    }
  }, [location.state]);

  return <Leaflet />;
};
