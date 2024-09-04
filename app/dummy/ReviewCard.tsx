import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewType } from "@/types/review/ReviewType";
import { getRatingDescription } from "@/types/review/GetRatingDescription";

const ReviewCard: React.FC<{ review: ReviewType }> = ({ review }) => (
  <Card className="w-[300px] h-[200px] overflow-auto flex-shrink-0">
    <CardContent className="p-4">
      <h3 className="font-bold">
        {review.rating}/10 {getRatingDescription(review.rating)}
      </h3>
      <p>{review.author}</p>
      <p>{review.date}</p>
      <p className="mt-2">{review.feedback}</p>
    </CardContent>
  </Card>
);
export default ReviewCard;
