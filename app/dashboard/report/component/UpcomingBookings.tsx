"use client";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLatestTransactionsByPropertyId } from "@/hooks/report/useLatestTransactions";
import { useUpcomingBookings } from "@/hooks/report/useUpcomingBookings";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { Avatar } from "@radix-ui/react-avatar";

const UpcomingBookings: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: upcomingBookings } = useUpcomingBookings(
    selectedProperty || ""
  );

  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {upcomingBookings && upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <div key={booking.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>
                      {booking.transactionDetail.transaction.firstName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-4 mr-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {booking.transactionDetail.transaction.firstName +
                        " " +
                        booking.transactionDetail.transaction.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.users.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.startDate + " - " + booking.endDate}
                    </p>
                  </div>
                  <div className="ml-auto space-y-1">
                    <p className="text-sm font-medium leading-none break-words">
                      {booking.room.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {"Room number: " + booking.room.roomNumber}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyDataAnimation
                message="No transactions so far, but good things are coming!"
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
export default UpcomingBookings;
