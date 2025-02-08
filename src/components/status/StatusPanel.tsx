import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Battery, Gauge, ArrowUp } from "lucide-react";

interface DroneMetrics {
  batteryLevel: number;
  altitude: number;
  speed: number;
}

interface StatusPanelProps {
  metrics?: DroneMetrics;
}

const StatusPanel = ({
  metrics = {
    batteryLevel: 75,
    altitude: 120,
    speed: 35,
  },
}: StatusPanelProps) => {
  const getBatteryColor = (level: number) => {
    if (level <= 20) return "text-red-500";
    if (level <= 40) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <Card className="w-full h-full max-w-[340px] p-4 bg-background border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Drone Status</h2>
          <Badge variant="outline" className="bg-secondary">
            Active
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Battery Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery className={getBatteryColor(metrics.batteryLevel)} />
                <span className="text-sm">Battery Level</span>
              </div>
              <span className="font-medium">{metrics.batteryLevel}%</span>
            </div>
            <Progress value={metrics.batteryLevel} className="h-2" />
          </div>

          <Separator />

          {/* Altitude */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUp className="text-blue-500" />
              <span className="text-sm">Altitude</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{metrics.altitude}</span>
              <span className="text-sm text-muted-foreground">m</span>
            </div>
          </div>

          <Separator />

          {/* Speed */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="text-purple-500" />
              <span className="text-sm">Speed</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{metrics.speed}</span>
              <span className="text-sm text-muted-foreground">km/h</span>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-4 p-3 bg-secondary rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Signal Strength</p>
              <p className="font-medium">Excellent</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">GPS Status</p>
              <p className="font-medium">Locked</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatusPanel;
