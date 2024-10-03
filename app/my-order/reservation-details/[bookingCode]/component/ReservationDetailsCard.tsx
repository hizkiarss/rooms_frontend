import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, BedDouble, Info, Moon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface ReservationDetailsCardProps {
  orderId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  roomType: string;
  guestCount: number;
  specialRequests?: string;
}

const ReservationDetailsCard: React.FC<ReservationDetailsCardProps> = ({
  orderId,
  checkIn,
  checkOut,
  guestName,
  roomType,
  guestCount,
  specialRequests,
}) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Reservation Details</span>
            <span className="text-sm font-normal">Booking ID: {orderId}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="w-full">
            <CardContent>
              <div className="flex justify-between items-center mt-6 mb-6">
                <div className="flex items-center">
                  <CalendarDays className="mr-2" />
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p>{checkIn}</p>
                  </div>
                </div>
                <div className="flex">
                  <Moon />
                  <div>2</div>
                </div>

                <div className="flex items-center">
                  <CalendarDays className="mr-2" />
                  <div>
                    <p className="font-semibold">Check-out</p>
                    <p>{checkOut}</p>
                  </div>
                </div>
              </div>
              <Separator />

              <div className="flex my-2 flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold mb-2">Guest Details</h3>
                  <div className="flex items-center">
                    <User className="mr-2" />
                    <p>{guestName}</p>
                  </div>
                </div>

                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold mb-2">Room</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BedDouble className="mr-2" />
                      <p>{roomType}</p>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <p>
                        {guestCount} tamu ({guestCount} dewasa)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <h3 className="font-semibold mb-2">Facilities</h3>
                  <p>-</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <Info className="mr-2" size={16} />
                <p>
                  Check out all the room features waiting for you on the
                  Accommodation Details page!
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationDetailsCard;
