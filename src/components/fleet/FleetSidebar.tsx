import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Battery, Signal, Wifi } from "lucide-react";

interface DroneStatus {
  id: string;
  name: string;
  batteryLevel: number;
  signalStrength: number;
  status: "active" | "inactive" | "warning" | "error";
  lastUpdated: string;
}

interface FleetSidebarProps {
  drones?: DroneStatus[];
  onDroneSelect?: (droneId: string) => void;
}

const defaultDrones: DroneStatus[] = [
  {
    id: "1",
    name: "Drone Alpha",
    batteryLevel: 85,
    signalStrength: 90,
    status: "active",
    lastUpdated: "2 mins ago",
  },
  {
    id: "2",
    name: "Drone Beta",
    batteryLevel: 45,
    signalStrength: 75,
    status: "warning",
    lastUpdated: "5 mins ago",
  },
  {
    id: "3",
    name: "Drone Gamma",
    batteryLevel: 20,
    signalStrength: 30,
    status: "error",
    lastUpdated: "1 min ago",
  },
];

const getStatusColor = (status: DroneStatus["status"]) => {
  const colors = {
    active: "bg-green-500",
    inactive: "bg-gray-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };
  return colors[status];
};

const getBatteryColor = (level: number) => {
  if (level > 70) return "text-green-500";
  if (level > 30) return "text-yellow-500";
  return "text-red-500";
};

const getSignalColor = (strength: number) => {
  if (strength > 70) return "text-green-500";
  if (strength > 30) return "text-yellow-500";
  return "text-red-500";
};

const FleetSidebar = ({
  drones = defaultDrones,
  onDroneSelect = () => {},
}: FleetSidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Fleet Overview</h2>
        <p className="text-sm text-muted-foreground">
          {drones.length} Drones Active
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-4">
          {drones.map((drone) => (
            <Card
              key={drone.id}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onDroneSelect(drone.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{drone.name}</h3>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(drone.status)} text-white`}
                >
                  {drone.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Battery
                      className={getBatteryColor(drone.batteryLevel)}
                      size={16}
                    />
                    <span>{drone.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Signal
                      className={getSignalColor(drone.signalStrength)}
                      size={16}
                    />
                    <span>{drone.signalStrength}%</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last Updated:</span>
                  <span>{drone.lastUpdated}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FleetSidebar;
