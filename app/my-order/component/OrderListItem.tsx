import Buttons from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCancelTransaction } from "@/hooks/transactions/useCancelTransaction";
import UploadPaymentProofForm from "@/app/dashboard/payment-confirmation/component/UploadPaymentProofForm";
import { ReviewType } from "@/types/review/ReviewType";
import UserReviewForm from "./UserReviewForm";
import SubmitSuccessAnimation from "@/components/animations/SubmitSuccessAnimation";
import OrderListCardHeader from "./OrderListCardHeader";
import { RoomType } from "@/types/rooms/RoomsType";
import { TransactionDetailType } from "@/types/transactions/TransactionDetailType";
import { Hotel, Moon } from "lucide-react";
import OrderListCardBody from "./OrderListCardBody";

interface OrderListProps {
  bookingCode: string;
  imgUrl: string;
  totalPrice: number;
  propertyName: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  paymentProofs: PaymentProofType[];
  onRefresh: () => void;
  transactionDetails: TransactionDetailType;
  review: ReviewType[];
  room: RoomType;
}

const OrderListItem: React.FC<OrderListProps> = ({
  bookingCode,
  imgUrl,
  totalPrice,
  propertyName,
  status,
  paymentMethod,
  transactionId,
  paymentProofs,
  onRefresh,
  transactionDetails,
  review,
  room,
}) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const { mutate: cancelTransaction } = useCancelTransaction();
  const router = useRouter();

  const handleDialogClose = () => {
    console.log("Dialog has been closed.");

    onRefresh(); // Assuming you have an `onRefresh` function to call
  };

  const handlePaymentGateway = () => {
    router.push(`/finish-payment/${bookingCode}`);
  };

  const handleDetailReservation = () => {
    router.push(`/my-order/reservation-details/${bookingCode}`);
  };

  const handleCancelClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmCancel = () => {
    if (bookingCode) {
      cancelTransaction({ bookingCode });
    } else {
      console.error("Booking code is missing");
    }
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleAddReview = () => {
    // Implement the logic to add a review
    console.log("Add review clicked for booking:", bookingCode);
    // You might want to open a review dialog or navigate to a review page
    // router.push(`/add-review/${bookingCode}`);
  };

  const endDatePrimitive: string =
    transactionDetails?.endDate?.toString() || "";
  const startDatePrimitive: string =
    transactionDetails?.startDate?.toString() || "";
  const startDate: Date = new Date(startDatePrimitive);
  const endDate: Date = new Date(endDatePrimitive);
  const timeDifference: number = endDate.getTime() - startDate.getTime();

  const dayDifference: number = timeDifference / (1000 * 3600 * 24);

  const formattedEndDate: string = new Date(
    endDatePrimitive
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedStartDate: string = new Date(
    startDatePrimitive
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedPrice: string = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  useEffect(() => {
    const checkEndDate = () => {
      if (endDatePrimitive) {
        const endDate = new Date(endDatePrimitive);
        const currentDate = new Date();
        setShowReviewButton(endDate < currentDate);
      }
    };

    checkEndDate();
    // Re-check every day
    const interval = setInterval(checkEndDate, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Card className="">
        <CardContent>
          <OrderListCardHeader
            bookingCode={bookingCode}
            status={status}
            handleDetailReservation={handleDetailReservation}
          />
          <Separator className="mb-4" />
          <OrderListCardBody
            propertyName={propertyName}
            room={room}
            formattedStartDate={formattedStartDate}
            formattedEndDate={formattedEndDate}
            dayDifference={dayDifference}
            formattedPrice={formattedPrice}
            status={status}
            paymentMethod={paymentMethod}
            paymentProofs={paymentProofs}
            onPaymentGateway={handlePaymentGateway}
            onCancelClick={handleCancelClick}
          />

          <div className="flex justify-end ">
            {status === "Success" &&
              showReviewButton &&
              review &&
              review.length == 0 && (
                <Button
                  onClick={() => setOpenReviewDialog(true)}
                  className="w-full sm:w-2/5 my-0 sm:my-5 rounded-lg ">
                  Add Review
                </Button>
              )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={openUploadDialog}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
          setOpenUploadDialog(open);
        }}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {" "}
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Upload Payment Proof
            </h4>
          </DialogTitle>

          <UploadPaymentProofForm transactionId={transactionId} />
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger Confirm Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Confirm Cancellation
            </h4>
          </DialogTitle>
          <p>Hold up! Do you really want to cancel this transaction?</p>
          <DialogFooter>
            <Button
              onClick={handleConfirmCancel}
              className="bg-transparent text-greenr hover:bg-red-600 hover:text-white rounded-lg px-4 py-2 border border-greenr hover:border-red-600 my-1">
              Yes, Cancel
            </Button>
            <Button
              onClick={handleCloseConfirmDialog}
              className="bg-transparent text-greenr hover:text-white hover:bg-greenr border border-greenr rounded-lg px-4 py-2 my-1">
              No, Keep
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openReviewDialog}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
          setOpenReviewDialog(open);
        }}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {" "}
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Share Your Stay Experience!
            </h4>
          </DialogTitle>

          <UserReviewForm
            userId="1"
            propertyId="1"
            bookingCode={bookingCode}
            onSubmitSuccess={() => {
              setOpenReviewDialog(false);
              handleDialogClose();
              setShowAnimation(true);
            }}
          />
        </DialogContent>
      </Dialog>
      {showAnimation && (
        <SubmitSuccessAnimation
          message="Review Complete! Thanks for Sharing!"
          onClose={() => setShowAnimation(false)}
        />
      )}
    </div>
  );
};

export default OrderListItem;
