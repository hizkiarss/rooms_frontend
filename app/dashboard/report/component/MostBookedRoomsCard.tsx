"use client";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMostBookedRooms } from "@/hooks/report/useMostBookedRooms";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { Avatar } from "@radix-ui/react-avatar";

const MostBookedRoomsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: mostBookedRoomNames } = useMostBookedRooms(
    selectedProperty || ""
  );

  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Most Booked Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mostBookedRoomNames && mostBookedRoomNames.length > 0 ? (
              mostBookedRoomNames.map((roomName, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {roomName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyDataAnimation
                message="No rooms so far, but good things are coming!"
                width={200}
                height={200}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </AnimationWrapper>
  );
};
export default MostBookedRoomsCard;
