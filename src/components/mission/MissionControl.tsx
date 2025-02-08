import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Plus,
  Save,
  Play,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Waypoint {
  id: string;
  lat: number;
  lng: number;
  altitude: number;
  speed: number;
}

interface MissionControlProps {
  waypoints?: Waypoint[];
  onSaveMission?: (waypoints: Waypoint[]) => void;
  onDeployMission?: (waypoints: Waypoint[]) => void;
}

const defaultWaypoints: Waypoint[] = [
  { id: "1", lat: 37.7749, lng: -122.4194, altitude: 100, speed: 15 },
  { id: "2", lat: 37.7748, lng: -122.4198, altitude: 120, speed: 12 },
];

const MissionControl = ({
  waypoints = defaultWaypoints,
  onSaveMission = () => {},
  onDeployMission = () => {},
}: MissionControlProps) => {
  const [activeWaypoints, setActiveWaypoints] = useState<Waypoint[]>(waypoints);

  const handleAddWaypoint = () => {
    const newWaypoint: Waypoint = {
      id: String(activeWaypoints.length + 1),
      lat: 0,
      lng: 0,
      altitude: 100,
      speed: 15,
    };
    setActiveWaypoints([...activeWaypoints, newWaypoint]);
  };

  const handleRemoveWaypoint = (id: string) => {
    setActiveWaypoints(activeWaypoints.filter((wp) => wp.id !== id));
  };

  const handleMoveWaypoint = (id: string, direction: "up" | "down") => {
    const index = activeWaypoints.findIndex((wp) => wp.id === id);
    if (direction === "up" && index > 0) {
      const newWaypoints = [...activeWaypoints];
      [newWaypoints[index - 1], newWaypoints[index]] = [
        newWaypoints[index],
        newWaypoints[index - 1],
      ];
      setActiveWaypoints(newWaypoints);
    } else if (direction === "down" && index < activeWaypoints.length - 1) {
      const newWaypoints = [...activeWaypoints];
      [newWaypoints[index], newWaypoints[index + 1]] = [
        newWaypoints[index + 1],
        newWaypoints[index],
      ];
      setActiveWaypoints(newWaypoints);
    }
  };

  return (
    <Card className="w-full h-[360px] bg-background border-border p-4">
      <Tabs defaultValue="waypoints" className="h-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="waypoints">Waypoints</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
          </TabsList>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSaveMission(activeWaypoints)}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={() => onDeployMission(activeWaypoints)}>
              <Play className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>

        <TabsContent value="waypoints" className="h-[calc(100%-48px)] mt-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {activeWaypoints.map((waypoint, index) => (
                <div
                  key={waypoint.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border bg-card"
                >
                  <div className="flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-grow grid grid-cols-2 gap-4">
                    <div>
                      <Label>Latitude</Label>
                      <Input
                        type="number"
                        value={waypoint.lat}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Longitude</Label>
                      <Input
                        type="number"
                        value={waypoint.lng}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Altitude (m)</Label>
                      <Input
                        type="number"
                        value={waypoint.altitude}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Speed (m/s)</Label>
                      <Input
                        type="number"
                        value={waypoint.speed}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveWaypoint(waypoint.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveWaypoint(waypoint.id, "down")}
                      disabled={index === activeWaypoints.length - 1}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveWaypoint(waypoint.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleAddWaypoint}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Waypoint
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="parameters" className="h-[calc(100%-48px)] mt-0">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mission Name</Label>
              <Input placeholder="Enter mission name" className="mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Enter mission description" className="mt-1" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MissionControl;
