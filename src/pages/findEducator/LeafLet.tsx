import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

const position: LatLngTuple = [51.505, -0.09];
const mapStyle = { height: "90vh" };

const Leaflet = () => {
  let markers;

  const addMarkers = () => {
    markers = [];
    for (let i = 0; i < 10000; i++) {
      markers.push({
        position: {
          lng: -122.673447 + Math.random() * 200.0,
          lat: 45.5225581 - 60 + Math.random() * 80,
        },
      });
    }
  };

  addMarkers();

  return (
    <Box>
      <MapContainer
        center={position}
        zoom={2}
        style={mapStyle}
        maxZoom={20}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          tileSize={256}
          zoomOffset={0}
          detectRetina={true}
          keepBuffer={4}
          updateWhenIdle={false}
          updateWhenZooming={true}
        />
        {/* <MarkerCluster markers={markers} addMarkers={addMarkers} /> */}
      </MapContainer>
    </Box>
  );
};

export default Leaflet;
