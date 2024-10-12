import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  User,
  BedDouble,
  Info,
  Moon,
  Hotel,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PropertyFacility } from "@/types/property-facility/PropertyFacilityType";
import { getAmenityLabel } from "@/utils/FacilityLogoUtils";
import AnimationWrapper from "@/components/animations/AnimationWrapper";

interface ReservationDetailsCardProps {
  orderId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  bedType: string;
  adult: number;
  childrenNumber: number;
  specialRequests?: string;
  facility: PropertyFacility[];
  night: number;
  roomName: string;
  status: string;
}

const ReservationDetailsCard: React.FC<ReservationDetailsCardProps> = ({
  orderId,
  checkIn,
  checkOut,
  guestName,
  bedType,
  adult,
  childrenNumber,
  facility,
  night,
  roomName,
  status,
}) => {
  const totalguest = adult + childrenNumber;
  return (
    <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Reservation Details</span>
            <div className="flex text-sm">
              <div className="mr-2">
                {status === "Pending" || status === "Check" ? (
                  <span className="text-yellow-500 border border-yellow-500 rounded-lg p-1">
                    {status}
                  </span>
                ) : status === "Success" ? (
                  <span className="text-greenr border border-greenr rounded-lg p-1">
                    {status}
                  </span>
                ) : status === "Cancelled" ||
                  status === "Rejected" ||
                  status === "Expired" ? (
                  <span className="text-red-500 border border-red-500 rounded-lg p-1">
                    {status}
                  </span>
                ) : null}
              </div>
              <span className="text-sm font-normal">Booking ID: {orderId}</span>
            </div>
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
                  <div>{night}</div>
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
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <p>{guestName}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2" />
                      <p>
                        {totalguest} Guest ({adult} Adult, {childrenNumber}{" "}
                        children)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold mb-2">Room</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Hotel className="mr-2" />
                      <p> 1 x {roomName}</p>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="mr-2" />
                      <p>{bedType}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <h3 className="font-semibold mb-2">Facilities</h3>
                  {facility && facility.length > 0 ? (
                    <div className="space-y-2">
                      {facility.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {getAmenityLabel(item.facilities.name)}
                          <p>{item.facilities.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
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
    </AnimationWrapper>
  );
};

export default ReservationDetailsCard;
