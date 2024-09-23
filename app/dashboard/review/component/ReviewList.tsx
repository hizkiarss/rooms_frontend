"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getRatingDescription } from "@/types/review/GetRatingDescription";
import { useReviewByPropertyId } from "@/hooks/Review/useReviewByPropertyId";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const ReviewList: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useReviewByPropertyId(selectedProperty as string);
  const [sortBy, setSortBy] = useState("most-recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "most-recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "highest-rating") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest-rating") {
      return a.rating - b.rating;
    }
    return 0;
  });

  if (isLoading) return <LoadingStateAnimation />;
  if (error) return <ErrorAnimation />;

  return (
    <div>
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Guest reviews
      </h4>

      <div className="flex justify-between mb-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-recent">Most recent</SelectItem>
            <SelectItem value="highest-rating">Highest rating</SelectItem>
            <SelectItem value="lowest-rating">Lowest rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {sortedReviews.map((review) => {
          // Format createdAt date
          const formattedDate = new Date(review.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <Card key={review.id}>
              <CardContent className="p-4">
                <h3 className="font-bold">
                  {review.rating}/10 {getRatingDescription(review.rating)}
                </h3>
                <p>{review.users.username}</p>
                <p>{formattedDate}</p>
                <p className="mt-2">{review.feedback}</p>

                {review.reply && (
                  <div className="mt-4 bg-[#F5F5DC] p-2 rounded">
                    <p className="font-semibold">Response :</p>
                    <p>{review.reply}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;
