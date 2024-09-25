"use client";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotalRoomsByPropertyId } from "@/hooks/report/useTotalRoomsByPropertyId";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { BedSingle } from "lucide-react";

const TotalRoomsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: totalRoom, isLoading } = useTotalRoomsByPropertyId(
    selectedProperty || ""
  );
  const total = totalRoom ?? 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Rooms</CardTitle>
        <BedSingle className="w-4" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="text-2xl font-bold">{total}</div>
        )}

        {/* <p className="text-xs text-muted-foreground">
    +180.1% from last month
  </p> */}
      </CardContent>
    </Card>
  );
};
export default TotalRoomsCard;
