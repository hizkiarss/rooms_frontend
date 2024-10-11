"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { ReviewType } from "@/types/review/ReviewType";

interface ReviewCarouselProps {
  reviews: ReviewType[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth transition duration-200">
        {reviews.slice(currentIndex, currentIndex + 3).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {currentIndex > 0 && (
        <Button
          variant="outline"
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
          onClick={prevReview}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {currentIndex < reviews.length - 1 && (
        <Button
          variant="outline"
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={nextReview}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
export default ReviewCarousel;
