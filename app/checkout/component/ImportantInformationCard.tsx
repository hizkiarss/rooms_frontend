import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";

interface ImportantInformationCardProps {
  fromDate: string;
  toDate: string;
  night: number;
  checkIn: string;
  checkout: string;
}

const ImportantInformationCard: React.FC<ImportantInformationCardProps> = ({
  fromDate,
  toDate,
  night,
  checkIn,
  checkout,
}) => {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Important information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2 text-xs font-thin text-gray-500 h-[150px] overflow-y-auto">
            <li>
              For a hassle-free check-in experience, we recommend giving us a
              quick call at least 48 hours before you arrive. This way, we can
              get everything ready for your stay and share any special check-in
              tips or instructions you might need. Check your booking
              confirmation for our contact details—your smooth journey starts
              here!
            </li>
            <li>
              Ready for some fun? Many properties host exciting events, like
              gala dinners and festive celebrations, that you won&apos;t want to
              miss! If you're interested, be sure to book your spot at least a
              week in advance to secure your place and avoid missing out. Fees
              and details for these events can be checked directly with the
              hotel.
            </li>
            <li>
              Thinking about getting around? We have transportation options
              available, but it's best to arrange them ahead of time. Whether
              you're in need of a shuttle, boat transfer, or any other mode of
              transport, just ask us about availability and pricing. Planning
              ahead is key, especially during busy travel seasons!
            </li>
            <li>
              Just a heads up: Some of our properties can only be accessed via
              specific transportation methods that run on set schedules. To
              ensure you don't miss your ride, please arrive at the departure
              point at least 30 minutes early. We're here to help with details
              about transportation options and any associated fees to make your
              travel seamless.
            </li>
            <li>
              Your health and safety are our top priorities! Our hotel is
              dedicated to upholding high standards of cleanliness and safety.
              We may have enhanced cleaning protocols and certifications in
              place to keep you feeling safe and sound. If you have any
              questions or concerns, don&apos;t hesitate to ask our friendly
              staff upon your arrival—we&apos;re here for you!
            </li>
          </ul>
          <Separator className="my-5" />
          <div className="flex">
            <div className="flex-col w-2/4">
              <div>
                <span>Check-in</span>
              </div>
              {fromDate}, {checkIn}
            </div>
            <div className="flex-col w-2/4 lg:w-3/4">
              <div>
                <span>Check-out</span>
              </div>
              {toDate}, {checkout} ({night}-night stay)
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center text-xs font-thin text-gray-500">
            <Lock className="w-5 h-5 mr-1" />
            <span>
              We use secure transmission and encrypted storage to protect your
              personal information.
            </span>
          </div>
          <div className="mt-2 text-xs font-thin text-gray-500">
            Payments are processed in the Indonesia. except where the travel
            provider processes your payment outside the Indonesia., in which
            case your card issuer may charge a foreign transaction fee.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportantInformationCard;
