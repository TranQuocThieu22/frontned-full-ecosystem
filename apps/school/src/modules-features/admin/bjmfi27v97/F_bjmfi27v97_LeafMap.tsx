// components/LeafletMap.tsx
"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Paper } from "@mantine/core";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface RoutingProps {
  points: [number, number][];
}

export function Routing({ points }: RoutingProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length < 2) return;

    // Chỉ thực hiện sau khi map "whenReady"
    map.whenReady(() => {
      const routingControl = L.Routing.control({
        waypoints: points.map(([lat, lng]) => L.latLng(lat, lng)),
        show: false,
        lineOptions: {
          styles: [{ color: "blue", weight: 4 }],
          extendToWaypoints: false,
          missingRouteTolerance: 0,
        },
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
      }).addTo(map);

      // Cleanup
      return () => {
        try {
          map.removeControl(routingControl);
        } catch (err) {
          console.warn("Failed to clean up routing control:", err);
        }
      };
    });
  }, [map, points]);

  return null;
}

export default function LeafletMap({ points }: RoutingProps) {
  return (
    <Paper w={"700px"} h={"500px"} style={{ zIndex: 1 }}>
      <MapContainer
        center={points[0]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [8.18, 102.14], // Tây Nam VN
          [23.4, 109.46], // Đông Bắc VN
        ]}
        maxBoundsViscosity={1.0}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((pos, i) => (
          <Marker key={i} position={pos}>
            <Popup>Stop {i + 1}</Popup>
          </Marker>
        ))}
        <Routing points={points} />
      </MapContainer>
    </Paper>
  );
}
