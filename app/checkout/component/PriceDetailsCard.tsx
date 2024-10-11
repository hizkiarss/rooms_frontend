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
  const tax: number = price * night * 0.12;
  const totalPrice: number = price * night + tax;
  const subTotalprice: number = price * night;
  const formattedPrice = subTotalprice.toLocaleString("id-ID");
  const formattedTotalPrice = totalPrice.toLocaleString("id-ID");
  const formattedTax = tax.toLocaleString("id-ID");
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
            <div>IDR {formattedPrice}</div>
          </div>
          <div className="flex justify-between">
            <div>taxes</div>
            <div>IDR {formattedTax}</div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold">
            <div>Total</div>
            <div>IDR {formattedTotalPrice}</div>
          </div>
          <div className="text-xs mt-5 font-thin text-gray-500">
            All set in Rupiah, and yes, the 12% tax is already included. Sit
            back, relax, and enjoy the ride—we&apos;ve got it covered.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceDetailsCard;
