import MyForm from "@/app/dashboard/payment-confirmation/component/UploadPaymentProofForm";
import Buttons from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCancelTransaction } from "@/hooks/transactions/useCancelTransaction";
import UploadPaymentProofForm from "@/app/dashboard/payment-confirmation/component/UploadPaymentProofForm";
import { TransactionDetailRequestType } from "@/types/transactions/TransactionDetailRequestType";
import { ReviewType } from "@/types/review/ReviewType";
import { R } from "@tanstack/react-query-devtools/build/legacy/devtools-5wO_5H1h";
import { Divide } from "lucide-react";
import UserReviewForm from "./UserReviewForm";
import SubmitSuccessAnimation from "@/components/animations/SubmitSuccessAnimation";

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
  transactionDetails: TransactionDetailRequestType;
  review: ReviewType[];
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
}) => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const { mutate: cancelTransaction } = useCancelTransaction();
  const router = useRouter();

  console.log("ini review", review);

  // useEffect(() => {
  //   if (!openUploadDialog && openUploadDialog !== null) {
  //     onRefresh();
  //   }
  // }, [openUploadDialog, onRefresh]);
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

  const endDatePrimitive = transactionDetails?.endDate?.toString() || "";

  if (endDatePrimitive) {
    const formattedDate = new Date(endDatePrimitive);
    console.log("Formatted Date:", formattedDate);
    // const endDate = new Date(endDatePrimitive);
    // const currentDate = new Date();
    // setShowReviewButton(endDate < currentDate);
  } else {
    console.log("End date is undefined or null");
  }
  const formattedDate = new Date(endDatePrimitive).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // const checkEndDate = () => {
  //   if (endDatePrimitive) {
  //     const endDate = new Date(endDatePrimitive);
  //     const currentDate = new Date();
  //     setShowReviewButton(endDate < currentDate);
  //   }
  // };
  // useEffect(() => {
  //   checkEndDate();
  //   // Re-check every day
  //   const interval = setInterval(checkEndDate, 24 * 60 * 60 * 1000);

  //   return () => clearInterval(interval);
  // }, [transactionDetails?.endDate]);

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

  console.log("Formatted Date:", formattedDate);

  return (
    <div>
      <Card className="">
        <CardContent>
          <div className="text-sm flex justify-between mt-6">
            <div>Booking Code : {bookingCode}</div>
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
                  <DropdownMenuItem className=" text-red-600">
                    Delete order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="text-lg flex items-center">
            <div className=" p-2 rounded-lg mr-2">
              <Image src={imgUrl} alt="Icon" width={24} height={24} />
            </div>
            <div>
              {propertyName} {status}
            </div>
          </div>
          <div className="flex  flex-col sm:flex-row items-center justify-between font-semibold gap-2">
            <div className="w-full sm:w-3/5 justify-start break-words mt-2">
              IDR {totalPrice}
            </div>
            {/* {transactionDetails && (
              <div>
                {" "}
                <p>ini endDatenya: {formattedDate}</p>{" "}
              </div>

            )} */}

            {status === "Pending" &&
              paymentMethod === PaymentMethodType.MANUAL_TRANSFER &&
              paymentProofs &&
              paymentProofs.length === 0 && (
                <div className="flex flex-col md:flex-row sm:justify-between w-full  gap-2">
                  <Button
                    onClick={() => setOpenUploadDialog(true)}
                    className="w-full rounded-lg py-3 text-center">
                    Upload Payment Proof
                  </Button>
                  <Button
                    onClick={handleCancelClick}
                    className="w-full rounded-lg py-3 text-center">
                    Cancel Transaction
                  </Button>
                </div>
              )}
            {status === "Pending" &&
              paymentMethod === PaymentMethodType.BANK_TRANSFER && (
                <Buttons
                  value="Finish Payment"
                  type="submit"
                  className="w-full sm:w-2/5 my-0 sm:my-5 rounded-lg"
                  onClick={handlePaymentGateway}
                />
              )}
            {status === "Success" &&
              showReviewButton &&
              review &&
              review.length == 0 && (
                <Button
                  onClick={() => setOpenReviewDialog(true)}
                  className="w-full sm:w-2/5 my-0 sm:my-5 rounded-lg">
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
