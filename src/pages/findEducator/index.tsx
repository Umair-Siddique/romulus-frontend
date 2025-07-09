import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useList } from "@refinedev/core";
import { useNavigate, useLocation } from "react-router";
import { Box, Button } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { CreateMissionModal, Map } from "#components/find-educator";

export const FindEducator = () => {
  const theme = useTheme<Theme>();

  const { user, userProfile } = useUserContext();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [educatorData, setEducatorData] = useState({
    coordinates: [],
    skills: [],
  });

  const { role } = user;

  const { data, isLoading, isError } = useList({
    resource: "educators/nearby",
    filters: [
      {
        field: "coordinates",
        operator: "eq",
        value: educatorData?.coordinates?.join(","),
      },
      {
        field: "skills",
        operator: "eq",
        value: educatorData?.skills?.join(","),
      },
      { field: "distance", operator: "eq", value: 5 },
    ],
    queryOptions: {
      enabled: !!educatorData?.coordinates && !!educatorData?.skills,
    },
  });

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const center: LatLngTuple = [
    educatorData?.coordinates[1] ??
      userProfile.officeAddressCoordinates.coordinates[1] ??
      0,
    educatorData?.coordinates[0] ??
      userProfile.officeAddressCoordinates.coordinates[0] ??
      0,
  ];

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

  return (
    <Box sx={{ position: "relative" }}>
      {/* Map displaying educator locations */}
      <Map markers={markers} center={center} />

      {/* Opens create mission modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{
          position: "absolute",
          bottom: theme.spacing(5),
          zIndex: 1000,
          right: "50%",
          textTransform: "none",
          padding: theme.spacing(1, 2),
          fontSize: theme.typography.body2.fontSize,
        }}
      >
        Create Mission
      </Button>

      {/* Create mission modal */}
      <CreateMissionModal
        open={modalOpen}
        onClose={handleModalClose}
        setEducatorData={setEducatorData}
      />
    </Box>
  );
};
