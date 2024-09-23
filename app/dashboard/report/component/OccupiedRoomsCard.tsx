"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentlyOccupiedRooms } from "@/hooks/report/useCurrentlyOccupiedRooms";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { Activity } from "lucide-react";

const OccupiedRoomsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: occupiedRooms } = useCurrentlyOccupiedRooms(
    selectedProperty || ""
  );
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
        <Activity className="w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{occupiedRooms || 0}</div>
      </CardContent>
    </Card>
  );
};
export default OccupiedRoomsCard;
