import React, { useState } from "react";
import ReviewPopup from "./ReviewPopup";
import ReviewCarousel from "./ReviewCarousel";
import { ReviewType } from "@/types/review/ReviewType";
import { getRatingDescription } from "@/types/review/GetRatingDescription";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ReviewCarouselProps {
  reviews: ReviewType[];
}

const ReviewComponent: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return (
    <div className="flex gap-1 w-full">
      <div className="w-3/12 ">
        <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl font-light text-green-800 tracking-tight pb-2">
          {averageRating.toFixed(1)}/10
        </h1>
        <h2 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight pb-3">
          {getRatingDescription(averageRating)}
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <div className="font-thin text-gray-800">
              {reviews.length} verified{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80"></PopoverContent>
        </Popover>
      </div>
      <div className="w-9/12">
        <ReviewCarousel reviews={reviews} />
        <div className="mt-4">
          <ReviewPopup reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
