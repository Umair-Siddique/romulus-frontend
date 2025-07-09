import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { useUserContext } from "#context";
import { CreateMissionModal, Map } from "#components";

export const FindEducator = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile } = useUserContext();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [distance, setDistance] = useState(50);
  const [educatorData, setEducatorData] = useState({
    coordinates: [],
    skills: [],
  });

  const { role } = user;

  const { data, isLoading, isError, refetch } = useList({
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
      { field: "distance", operator: "eq", value: distance },
    ],
    queryOptions: {
      enabled:
        !!educatorData?.coordinates.length && !!educatorData?.skills.length,
    },
  });

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    // Refetch data when distance changes
    if (educatorData?.coordinates.length && educatorData?.skills.length) {
      refetch();
    }
  }, [distance]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  const center: LatLngTuple = [
    educatorData?.coordinates[1] ||
      userProfile.officeAddressCoordinates.coordinates[1],
    educatorData?.coordinates[0] ||
      userProfile.officeAddressCoordinates.coordinates[0],
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
      {/* Distance slider positioned at top right */}
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: 1000,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: theme.spacing(1, 2),
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: 300,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: "0.875rem", textAlign: "right" }}
        >
          {distance === 50
            ? `Default Radius: ${distance} km`
            : `Radius: ${distance} km`}
        </Typography>
        <Slider
          value={distance}
          onChange={handleDistanceChange}
          min={10}
          max={100}
          step={10}
          marks
          valueLabelDisplay="auto"
          sx={{
            color: theme.palette.primary.main,
            "& .MuiSlider-thumb": {
              width: 20,
              height: 20,
            },
            "& .MuiSlider-track": {
              height: 4,
            },
            "& .MuiSlider-rail": {
              height: 4,
            },
          }}
        />
      </Box>

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
