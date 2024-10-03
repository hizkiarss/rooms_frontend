import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, CalendarDays, Info, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PropertyReservationDetailCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span>Accommodation Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="text-lg flex items-center mb-2">
            <div className="bg-pink-100 p-2 rounded-lg mr-2">
              <Image
                src="https://res.cloudinary.com/dwrm5t649/image/upload/v1725487036/upload/image/dtj0xe5kffk9ifsfx3y0.jpg"
                alt="Icon"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-col">
              <div>Property Name</div>
              <div className="flex gap-2">
                <div>rating</div>
                <div> - </div>
                <div>alamat Property</div>
              </div>
            </div>
          </div>

          <Link href="#" className="font-semibold text-greenr hover:underline">
            Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default PropertyReservationDetailCard;
