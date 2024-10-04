import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      <div>Booking Code : {bookingCode}</div>

      <div className="flex items-center space-x-2">
        <div>
          {status === "Pending" || status === "Check" ? (
            <span className="text-yellow-500 border border-yellow-500 rounded-lg p-1">
              {status}
            </span>
          ) : status === "Success" ? (
            <span className="text-greenr border border-greenr rounded-lg p-1">
              {status}
            </span>
          ) : status === "Cancelled" ||
            status === "Rejected" ||
            status === "Expired" ? (
            <span className="text-red-500 border border-red-500 rounded-lg p-1">
              {status}
            </span>
          ) : null}
        </div>

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
              <DropdownMenuItem className="text-red-600">
                Delete order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default OrderListCardHeader;
