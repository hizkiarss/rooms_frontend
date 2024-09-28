"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReviewType } from "@/types/review/ReviewType";
import { getRatingDescription } from "@/types/review/GetRatingDescription";
interface ReviewCarouselProps {
  reviews: ReviewType[];
}

const ReviewPopup: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [sortBy, setSortBy] = useState("most-recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "most-recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "rating-asc") {
      return a.rating - b.rating;
    } else if (sortBy === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">See all reviews</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Guest reviews</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between mb-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-recent">Most Recent</SelectItem>
              <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {sortedReviews.map((review) => {
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
                  <p>{review.users?.username}</p>
                  <p>{formattedDate}</p>{" "}
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
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPopup;
