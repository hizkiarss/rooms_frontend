import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PriceDetailsCardProps {
  night: number;
  price: number;
}
const PriceDetailsCard: React.FC<PriceDetailsCardProps> = ({
  night,
  price,
}) => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Price details</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <div className="flex justify-between">
            <div>1 room x {night} night</div>
            <div>IDR {price}</div>
          </div>
          <div className="flex justify-between">
            <div>taxes</div>
            <div>IDR {price}</div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <div>Total</div>
            <div>IDR {price}</div>
          </div>
          <div className="text-xs mt-5 font-thin text-gray-500">
            Rates are quoted in Indonesian Rupiah. Taxes merupakan PPN sebesar
            12% are calculated based on the price {price}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceDetailsCard;
