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
  const [sortBy, setSortBy] = useState("most-relevant");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "most-recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
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
              <SelectItem value="most-relevant">Most relevant</SelectItem>
              <SelectItem value="most-recent">Most recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <h3 className="font-bold">
                  {review.rating}/10 {getRatingDescription(review.rating)}
                </h3>
                <p>{review.author}</p>
                <p>{review.date}</p>
                <p className="mt-2">{review.feedback}</p>
                {/* {review.response && (
                  <div className="mt-4 bg-gray-100 p-2 rounded">
                    <p className="font-semibold">
                      Response from {review.response.author} on{" "}
                      {review.response.date}
                    </p>
                    <p>{review.response.content}</p>
                  </div>
                )} */}

                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <p className="font-semibold">Response :</p>
                  <p>{review.reply}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewPopup;
