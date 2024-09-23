"use client";
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
import { Info } from "lucide-react";
import { useReviewByPropertyId } from "@/hooks/Review/useReviewByPropertyId";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const ReviewComponent: React.FC = () => {
  const { data: reviews, isLoading, error } = useReviewByPropertyId("1");

  if (isLoading)
    return (
      <div>
        <LoadingStateAnimation />
      </div>
    );

  if (error)
    return (
      <div>
        <ErrorAnimation />
      </div>
    );

  if (!reviews || reviews.length === 0) {
    return <div></div>;
  }

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
            <div className="font-thin text-gray-800 flex items-center space-x-2">
              <span>
                {reviews.length} verified{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </span>
              <Info className="w-4 h-4 text-gray-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>
              Real stays, real stories every review here is from guests who've
              actually been there, done that. Only folks who've booked with us
              can leave a review. We give each one a look, and we post them all
              whether it's thumbs up or a little more room service next time!
            </div>
          </PopoverContent>
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
