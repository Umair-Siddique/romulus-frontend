import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import { useUserContext } from "#context";
import { useList } from "@refinedev/core";
import Leaflet from "./LeafLet";

export const FindEducator = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { role } = user;

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

  type Marker = {
    position: {
      lng: number;
      lat: number;
    };
    name: string;
    skills: string[];
  };

  const markers: Marker[] = [];

  if (data) {
    data?.data.forEach((educator: any) => {
      markers.push({
        position: {
          lng: educator.fullAddressCoordinates.coordinates[0],
          lat: educator.fullAddressCoordinates.coordinates[1],
        },
        name: educator.name,
        skills: educator.skills,
      });
    });
  }

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

  return <Leaflet markers={markers} />;
};
