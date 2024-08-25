import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";

const ImportantInformationCard = () => {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Important information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2 text-xs font-thin text-gray-500 h-[150px] overflow-y-auto">
            <li>
              Guests must transfer via boat to the property. Guests must contact
              the property at least 48 hours before travel, using the contact
              information on the confirmation received after booking. This
              property offers transfers from the ferry terminal (surcharges may
              apply). To arrange pick-up, guests must contact the property 72
              hours prior to arrival, using the contact information on the
              booking confirmation. This property doesn't offer after-hours
              check-in. To make arrangements for check-in please contact the
              property at least 72 hours before arrival using the information on
              the booking confirmation. Guests must contact the property in
              advance for check-in instructions. Front desk staff will greet
              guests on arrival. For more details, please contact the property
              using the information on the booking confirmation.
            </li>
            <li>
              This property hosts an optional New Year's Eve gala dinner for
              guests staying on December 31, 2024. Guests who wish to attend
              must book the gala dinner at least 7 days in advance. Fees are THB
              3,600 per adult and THB 1,800 per child ages 2-11, collected by
              the property. There are no fees for children age 1 and younger to
              attend with paying adults.
            </li>
            <li>
              A speed boat is available and must be reserved 2 days in advance
              or at time of booking the reservation
            </li>
            <li>
              This property is accessible only by boat (surcharge) from Ao Por
              Grand Marina (Phuket) to the resort at 11 AM, 1 PM, and 4 PM from
              May to October and returning from the resort at 10 AM, noon, and 3
              PM. The departure schedule from November to April leaving Ao Por
              Grand Marina is 11 AM, noon, 1 PM, 2 PM, and 4 PM and returning
              from the resort at 10 AM, 11 AM, noon, 1 PM, and 3 PM. Passengers
              are required to arrive at least 30 minutes prior to their
              scheduled departure time. Guests must pay the speedboat fee in
              advance online or at the property on arrival. Roundtrip speedboats
              are available for up to 10 persons between dawn and dusk, subject
              to weather conditions.
            </li>
            <li>
              This is a certified Thailand SHA Plus property. Thailand SHA Plus
              is a health and safety certification (an additional level to the
              SHA standard), for properties that are open to vaccinated
              travelers and have at least 70% of staff vaccinated, issued by the
              Amazing Thailand Safety and Health Administration
            </li>
          </ul>
          <Separator className="my-5" />
          <div className="flex">
            <div className="flex-col w-2/4">
              <div>
                <span>Check-in</span>
              </div>
              Tue, Sep 3, 3:00 PM
            </div>
            <div className="flex-col w-2/4 lg:w-3/4">
              <div>
                <span>Check-out</span>
              </div>
              Wed, Sep 4, 11:30 AM (1-night stay)
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
            Payments are processed in the U.S. except where the travel provider
            (hotel / airline etc) processes your payment outside the U.S., in
            which case your card issuer may charge a foreign transaction fee.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportantInformationCard;
