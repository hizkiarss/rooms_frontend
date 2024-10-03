import { Button } from "@/components/ui/button";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { Hotel, Moon } from "lucide-react";

interface OrderListCardBodyProps {
  propertyName: string;
  room: { name: string };
  formattedStartDate: string;
  formattedEndDate: string;
  dayDifference: number;
  formattedPrice: string;
  status: string;
  paymentMethod: string;
  paymentProofs: any[];
  onPaymentGateway: () => void;
  onCancelClick: () => void;
}

const OrderListCardBody: React.FC<OrderListCardBodyProps> = ({
  propertyName,
  room,
  formattedStartDate,
  formattedEndDate,
  dayDifference,
  formattedPrice,
  status,
  paymentMethod,
  paymentProofs,
  onPaymentGateway,
  onCancelClick,
}) => {
  return (
    <div>
      <div className="text-lg flex items-center">
        <Hotel className="w-7 h-7 mr-2" />
        <div className="flex flex-col">
          <div>{propertyName}</div>
          <div className="text-sm">{room.name}</div>
        </div>
      </div>
      <div className="flex text-sm ">
        <div>
          {formattedStartDate} - {formattedEndDate}
        </div>
        <div className="flex ml-2 items-center">
          <Moon className="w-4 h-4" />
          <div>{dayDifference} night</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between font-semibold gap-2">
        <div className="w-full sm:w-3/5 justify-start break-words mt-2 font-normal">
          IDR {formattedPrice}
        </div>

        {status === "Pending" &&
          paymentMethod === PaymentMethodType.MANUAL_TRANSFER &&
          paymentProofs.length === 0 && (
            <div className="flex flex-col md:flex-row sm:justify-between w-full gap-2">
              <Button
                value="Finish Payment"
                type="submit"
                className="w-full rounded-lg py-3 text-center"
                onClick={onPaymentGateway}>
                Finish Payment
              </Button>
              <Button
                onClick={onCancelClick}
                className="w-full bg-transparent text-red-500 border hover:bg-red-500 hover:text-white border-red-500 rounded-lg py-3 text-center">
                Cancel Transaction
              </Button>
            </div>
          )}
        {status === "Pending" &&
          paymentMethod === PaymentMethodType.BANK_TRANSFER && (
            <div className="flex flex-col md:flex-row sm:justify-between w-full gap-2">
              <Button
                value="Finish Payment"
                type="submit"
                className="w-full rounded-lg py-3 text-center"
                onClick={onPaymentGateway}>
                Finish Payment
              </Button>
              <Button
                onClick={onCancelClick}
                className="w-full bg-transparent text-red-500 border hover:bg-red-500 hover:text-white border-red-500 rounded-lg py-3 text-center">
                Cancel Transaction
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default OrderListCardBody;
