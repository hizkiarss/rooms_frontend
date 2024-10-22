import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusLabel } from "@/utils/statusLabel";
import { getStatusStyle } from "@/utils/statusStyle";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface OrderListCardHeaderProps {
  status: string;
  bookingCode: string;
  handleDetailReservation: () => void;
}

const OrderListCardHeader: React.FC<OrderListCardHeaderProps> = ({
  status,
  bookingCode,
  handleDetailReservation,
}) => {
  return (
    <div className="text-sm flex justify-between mt-6 items-center mb-2">
      <div className="flex flex-col">
        <div>Booking Code : {bookingCode}</div>
        {status && (
          <span
            className={`${getStatusStyle(
              status
            )} text-center border rounded-lg p-1 mt-2`}>
            {getStatusLabel(status)}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div></div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDetailReservation}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default OrderListCardHeader;
