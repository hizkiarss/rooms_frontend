import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CancelationCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Cancellation policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2 text-sm font-thin text-gray-500">
            <li>
              This rate is non-refundable. If you change or cancel your booking,
              you will not get a refund or credit to use for a future stay.
            </li>
            <li>
              No refunds will be issued for late check-in or early check-out.
            </li>
            <li>Stay extensions require a new reservation.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CancelationCard;
