import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Navigation } from "lucide-react";

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  drones?: Array<{
    id: string;
    position: [number, number];
    name: string;
    status: "active" | "inactive" | "warning";
  }>;
  noFlyZones?: Array<{
    id: string;
    coordinates: [number, number][];
    name: string;
  }>;
  onDroneClick?: (droneId: string) => void;
  onZoneClick?: (zoneId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  drones = [
    { id: "1", position: [51.505, -0.09], name: "Drone 1", status: "active" },
    { id: "2", position: [51.51, -0.1], name: "Drone 2", status: "warning" },
  ],
  noFlyZones = [
    {
      id: "nfz1",
      coordinates: [
        [51.5, -0.08],
        [51.51, -0.08],
        [51.51, -0.07],
        [51.5, -0.07],
      ],
      name: "Restricted Area 1",
    },
  ],
  onDroneClick = () => {},
  onZoneClick = () => {},
}) => {
  return (
    <Card className="w-full h-full bg-background p-4 relative overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Container - In a real implementation, this would be replaced with a proper map library */}
      <div className="w-full h-full bg-muted rounded-lg relative">
        {/* Placeholder Map Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
            <Navigation className="h-6 w-6" />
            <span>Map View</span>
            <div className="text-xs">
              Center: {center[0]}, {center[1]} | Zoom: {zoom}
            </div>
          </div>
        </div>

        {/* Drone Indicators */}
        {drones.map((drone) => (
          <div
            key={drone.id}
            className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
              drone.status === "active"
                ? "bg-green-500"
                : drone.status === "warning"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{
              left: `${((drone.position[1] + 180) / 360) * 100}%`,
              top: `${((90 - drone.position[0]) / 180) * 100}%`,
            }}
            onClick={() => onDroneClick(drone.id)}
          />
        ))}

        {/* No-Fly Zones */}
        {noFlyZones.map((zone) => (
          <div
            key={zone.id}
            className="absolute border-2 border-red-500 opacity-30 bg-red-200"
            style={{
              // This is a simplified representation
              left: "20%",
              top: "20%",
              width: "100px",
              height: "100px",
            }}
            onClick={() => onZoneClick(zone.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default MapView;
