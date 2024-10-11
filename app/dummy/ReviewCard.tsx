import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewType } from "@/types/review/ReviewType";
import { getRatingDescription } from "@/types/review/GetRatingDescription";

const ReviewCard: React.FC<{ review: ReviewType }> = ({ review }) => {
  const createdAt = review?.createdAt || "";
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-[300px] h-[220px] overflow-auto flex-shrink-0 bg-white text-greenr border border-gray-400 shadow-custom ">
      <CardContent className="p-4 flex flex-col h-full  ">
        <div className={"flex flex-col justify-between h-full"}>
          <div>
            <div className={"flex justify-between"}>
              <h3 className="font-semibold text-2xl">
                {review.rating} <span className={"text-base -ml-1"}>/10 </span>
              </h3>
              <p
                className={
                  " bg-greenr rounded-lg text-white w-fit pt-[4px]  px-2 text-sm font-semibold"
                }>
                {" "}
                {getRatingDescription(review.rating)}{" "}
              </p>
            </div>

            <p className={"font-semibold mt-2 "}>
              {review.users?.username || "username"}
            </p>
            {/* Menampilkan `createdAt` yang sudah diformat */}
            <p className="mt-3 text-sm mb-4">&quot; {review.feedback} </p>
          </div>
          <p className={"text-end text-sm font-semibold"}>{formattedDate}</p>{" "}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
