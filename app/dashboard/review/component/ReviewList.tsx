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
import { ReviewType } from "@/types/review/ReviewType";
import PaginationControl from "@/components/PaginationControl";

const ReviewList: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("MOST_RECENT");
  const size = 10;
  const {
    data: reviewPage,
    isLoading,
    error,
  } = useReviewByPropertyId(selectedProperty as string, page, size, sortBy);

  if (isLoading) return <LoadingStateAnimation />;
  if (error) return <ErrorAnimation />;

  console.log("ini review pagenya ", reviewPage);
  console.log("ini isi review pagenya ", reviewPage?.content);
  const handlePageChange = (newPage: number) => {
    console.log("kepencet, INI PAGENYA", newPage);
    if (reviewPage && newPage > 0 && newPage <= reviewPage.totalPages) {
      setPage(newPage - 1); // -1 karena index halaman biasanya mulai dari 0
    }
  };

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
            <SelectItem value="MOST_RECENT">Most recent</SelectItem>
            <SelectItem value="HIGHEST_RATING">Highest rating</SelectItem>
            <SelectItem value="LOWEST_RATING">Lowest rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {reviewPage?.content &&
          (reviewPage.content as unknown as ReviewType[]).map((review) => {
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
        <PaginationControl
          currentPage={page}
          totalPages={reviewPage?.totalPages || 0}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ReviewList;
