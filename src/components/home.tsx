import React from "react";
import DashboardHeader from "./layout/DashboardHeader";
import FleetSidebar from "./fleet/FleetSidebar";
import MapView from "./map/MapView";
import StatusPanel from "./status/StatusPanel";
import MissionControl from "./mission/MissionControl";

interface HomeProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Home = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
      <div className="flex h-[calc(100vh-64px)]">
        <FleetSidebar />
        <main className="flex-1 p-4 space-y-4 overflow-auto">
          <div className="flex gap-4 h-[558px]">
            <MapView />
            <StatusPanel />
          </div>
          <MissionControl />
        </main>
      </div>
    </div>
  );
};

export default Home;
