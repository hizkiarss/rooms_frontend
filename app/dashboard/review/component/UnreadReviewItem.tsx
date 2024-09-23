"use client";
import SubmitSuccessAnimation from "@/components/animations/SubmitSuccessAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useSetReadReview } from "@/hooks/Review/useSetReadReview";

import { getRatingDescription } from "@/types/review/GetRatingDescription";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReplyReviewForm from "./ReplyReviewForm";

interface UnReadReviewProps {
  propertyName: string;
  rating: number;
  userName: string;
  feedback: string;
  reviewId: string;
  onRefresh: () => void;
  propertyId: string;
}

const UnReadReviewItem: React.FC<UnReadReviewProps> = ({
  propertyName,
  rating,
  userName,
  feedback,
  reviewId,
  onRefresh,
  propertyId,
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [onReply, setOnReply] = useState(false);
  const { mutate: setReadReview } = useSetReadReview();

  const handleSetReadReview = ({ reviewId }: { reviewId: string }) => {
    if (reviewId) {
      setReadReview({ reviewId });
      setShowAnimation(true);
    } else {
      console.error("Review ID is missing");
    }
  };
  console.log("bangke emang", propertyId);
  const router = useRouter();

  const handleDialogClose = () => {
    console.log("Dialog has been closed.");
    onRefresh();
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div>
      <Card className="mb-2">
        <CardContent>
          <div className="text-sm flex justify-between mt-6">
            <div>Property Name : {propertyName}</div>
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
                  <DropdownMenuItem onClick={() => setOnReply(true)}>
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setOpenConfirmDialog(true)}
                    className=" text-red-600">
                    Mark as Read
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator className="mb-4" />
          <h3 className="font-bold">
            {rating}/10 {getRatingDescription(rating)}
          </h3>
          <p>{userName}</p>
          <p>{"date"}</p>
          <p className="mt-2">{feedback}</p>
          {onReply && (
            <ReplyReviewForm
              reviewId={reviewId}
              onSubmitSuccess={() => {
                setOnReply(false);
                setShowAnimation(true);
              }}
              propertyId={propertyId}
            />
          )}
          <div className="flex  flex-col sm:flex-row items-center justify-between font-semibold gap-2">
            <div className="w-full sm:w-3/5 justify-start break-words mt-2"></div>
            {onReply && (
              <Button
                onClick={() => setOnReply(false)}
                className="w-full sm:w-2/5 my-0 sm:my-5 rounded-lg">
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger Confirm Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Mark as read
            </h4>
          </DialogTitle>
          <p>
            Whoa, hold on! Marking this as read means no more replies and the
            conversation ends. Sure you're good?
          </p>
          <DialogFooter>
            <Button
              onClick={handleCloseConfirmDialog}
              className="bg-transparent text-greenr hover:bg-red-600 hover:text-white rounded-lg px-4 py-2 border border-greenr hover:border-red-600 my-1">
              Nope, still thinking!
            </Button>
            <Button
              onClick={() => handleSetReadReview({ reviewId })}
              className="bg-transparent text-greenr hover:text-white hover:bg-greenr border border-greenr rounded-lg px-4 py-2 my-1">
              Yes, Ready to move on!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showAnimation && (
        <SubmitSuccessAnimation
          message="Response sent! Thanks for sharing your wisdom!"
          onClose={() => {
            setShowAnimation(false);
            handleDialogClose();
          }}
        />
      )}
    </div>
  );
};

export default UnReadReviewItem;
