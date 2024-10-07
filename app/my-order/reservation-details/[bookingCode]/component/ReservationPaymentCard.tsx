import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { Dot } from "lucide-react";
import ManualTransferDetails from "./ManualTransferDetails";
import VirtualAccountDetails from "./VirtualAccountDetails";

interface ReservationPaymentCardProps {
  propertyName: string;
  roomName: string;
  roomPrice: string;
  totalPrice: string;
  paymentMethod: string;
  night: number;
  tax: string;
  subTotal: string;
}

const ReservationPaymentCard: React.FC<ReservationPaymentCardProps> = ({
  propertyName,
  roomName,
  roomPrice,
  totalPrice,
  paymentMethod,
  night,
  tax,
  subTotal,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="text-lg flex items-center mb-2">
            <div className="flex-col">
              <div>{propertyName}</div>
            </div>
          </div>
        </div>
        <Card className="w-full">
          <CardContent className="py-6 space-y-4">
            <div>{roomName}</div>
            <Separator />
            <div>Price</div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                <Dot />
                <div>Night 1 x 1 Room</div>
              </div>
              <div>IDR {roomPrice}</div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                <Dot />
                <div>Night {night} x 1 Room</div>
              </div>
              <div>IDR {subTotal}</div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                <Dot />
                <div>Tax</div>
              </div>
              <div>IDR {tax}</div>
            </div>
            <Separator />
            <div>Payment Method</div>
            {paymentMethod === PaymentMethodType.BANK_TRANSFER ? (
              <VirtualAccountDetails />
            ) : (
              <ManualTransferDetails />
            )}

            <Separator />
            <div className="flex items-center justify-between mt-4">
              <div>Total</div>
              <div>IDR {totalPrice}</div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
export default ReservationPaymentCard;
