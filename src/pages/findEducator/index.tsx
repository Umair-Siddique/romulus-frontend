import { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { useList } from "@refinedev/core";
import { useNavigate, useLocation } from "react-router";

import Map from "./Map";
import { useUserContext } from "#context";

export const FindEducator = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { role } = user;

  const { data, isLoading, isError } = useList({
    resource: "educators/nearby",
    filters: [
      {
        field: "coordinates",
        operator: "eq",
        value: location.state?.coordinates?.join(","),
      },
      {
        field: "skills",
        operator: "eq",
        value: location.state?.skills?.join(","),
      },
      { field: "distance", operator: "eq", value: 5 },
    ],
    queryOptions: {
      enabled: !!location.state?.coordinates && !!location.state?.skills,
    },
  });

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  const center: LatLngTuple = [
    location.state?.coordinates[1] ?? 0,
    location.state?.coordinates[0] ?? 0,
  ];

  console.log(
    "FindEducator -> location.state?.coordinates:",
    location.state?.coordinates
  );

  console.log("FindEducator -> center:", center);

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

  return <Map markers={markers} center={center} />;
};
