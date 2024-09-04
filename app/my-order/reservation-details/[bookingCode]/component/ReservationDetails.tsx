import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, BedDouble, Info } from "lucide-react";
import Image from "next/image";

interface ReservationDetailsProps {
  orderId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  roomType: string;
  guestCount: number;
  specialRequests?: string;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  orderId,
  checkIn,
  checkOut,
  guestName,
  roomType,
  guestCount,
  specialRequests,
}) => {
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Detail Reservasi</span>
            <span className="text-sm font-normal">Order ID {orderId}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg flex items-center mb-2">
            <div className="bg-pink-100 p-2 rounded-lg mr-2">
              <Image
                src="/path-to-your-icon.svg"
                alt="Icon"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-col">
              <div>Property Name</div>
              <div className="flex gap-2">
                <div>rating</div>
                <div>-</div>
                <div>alamat</div>
              </div>
            </div>
          </div>
          <Card className="w-full">
            <CardContent>
              <div className="flex justify-between mt-6 mb-6">
                <div className="flex items-center">
                  <CalendarDays className="mr-2" />
                  <div>
                    <p className="font-semibold">Check-in</p>
                    <p>{checkIn}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarDays className="mr-2" />
                  <div>
                    <p className="font-semibold">Check-out</p>
                    <p>{checkOut}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold mb-2">Detail Tamu</h3>
                  <div className="flex items-center">
                    <User className="mr-2" />
                    <p>{guestName}</p>
                  </div>
                </div>

                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold mb-2">Kamar</h3>
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
                  <h3 className="font-semibold mb-2">Fasilitas</h3>
                  <p>-</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <Info className="mr-2" size={16} />
                <p>
                  Lihat info lebih lanjut tentang fasilitas kamar di halaman
                  Detail Kamar.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationDetails;
