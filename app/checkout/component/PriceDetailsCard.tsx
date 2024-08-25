import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PriceDetailsCard = () => {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Price details</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <div className="flex justify-between">
            <div>1 room x 1 night</div>
            <div>$69.49</div>
          </div>
          <div className="flex justify-between">
            <div>taxes</div>
            <div>$9.49</div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <div>Total</div>
            <div>$9.49</div>
          </div>
          <div className="text-xs mt-5 font-thin text-gray-500">
            Rates are quoted in US dollars. Taxes are calculated based on the
            price ($78.69) before we apply savings for paying now ($9.20) on
            your behalf.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceDetailsCard;
