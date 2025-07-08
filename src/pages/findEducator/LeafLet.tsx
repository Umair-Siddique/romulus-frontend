import { Box } from "@mui/material";
import type { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { MarkerProps } from "#types";

const position: LatLngTuple = [51.505, -0.09];
const mapStyle = { height: "90vh" };

const Leaflet = ({ markers }: { markers: MarkerProps[] }) => {
  const addMarkers = () => {
    return markers;
  };

  addMarkers();

  return (
    <Box>
      <MapContainer
        center={position}
        zoom={10}
        style={mapStyle}
        maxZoom={20}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={100}
          tileSize={256}
          zoomOffset={0}
          detectRetina={true}
          keepBuffer={4}
          updateWhenIdle={false}
          updateWhenZooming={true}
        />
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={[marker.position.lat, marker.position.lng]}
            ></Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default Leaflet;
