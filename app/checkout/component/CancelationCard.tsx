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
              Just a heads-up: This rate is non-refundable! If you need to
              change or cancel your booking, please note that refunds or credits
              for future stays won&apos;t be available. We want you to have the
              best experience possible, so please plan accordingly!
            </li>
            <li>
              No refunds will be issued for late check-ins or early check-outs.
              We know life can be unpredictable, but once you&apos;re here, we
              want you to fully enjoy your stay with us!
            </li>
            <li>
              If you&apos;re thinking about extending your stay, that&apos;s
              fantastic! Just remember that you&apos;ll need to make a new
              reservation to secure your additional nights. Our team is here to
              help make those arrangements as smooth as possible!
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CancelationCard;
