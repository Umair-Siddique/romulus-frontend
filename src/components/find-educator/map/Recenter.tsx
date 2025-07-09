import { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

function Recenter({ center }: { center: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default Recenter;
