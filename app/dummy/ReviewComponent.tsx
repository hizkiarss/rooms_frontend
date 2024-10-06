"use client";
import React, {useState} from "react";
import ReviewPopup from "./ReviewPopup";
import ReviewCarousel from "./ReviewCarousel";
import {ReviewType} from "@/types/review/ReviewType";
import {getRatingDescription} from "@/types/review/GetRatingDescription";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Info} from "lucide-react";
import {useReviewByPropertyId} from "@/hooks/Review/useReviewByPropertyId";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const ReviewComponent: React.FC = () => {
    const {data: reviews, isLoading, error} = useReviewByPropertyId("1");

    if (isLoading)
        return (
            <div>
                <LoadingStateAnimation/>
            </div>
        );

    if (error)
        return (
            <div>
                <ErrorAnimation/>
            </div>
        );

    if (!reviews || reviews.length === 0) {
        return <div></div>;
    }

    const averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return (
        <div className="flex w-full items-center">
            <div className="w-4/12 flex justify-center ">
                <div className={"flex flex-col"}>
                    <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-6xl font-light  tracking-tight ">
                    {averageRating.toFixed(1)} /10
                </h1>
                    <div className={"bg-greenr text-white px-2 py-2 w-fit rounded-xl h-fit"}>
                        <h2 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight ">
                            {getRatingDescription(averageRating)}
                        </h2>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="font-thin text-gray-800 flex items-center space-x-2 mt-4">
              <span>
                {reviews.length} verified{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
              </span>
                                <Info className="w-4 h-4 text-gray-500"/>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div>
                                Real stays, real stories every review here is from guests who&apos;ve
                                actually been there, done that. Only folks who&apos;ve booked with us
                                can leave a review. We give each one a look, and we post them all
                                whether it&apos;s thumbs up or a little more room service next time!
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>

            </div>
            <div className="w-9/12">
                <ReviewCarousel reviews={reviews}/>
                <div className="mt-4">
                    <ReviewPopup reviews={reviews}/>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
