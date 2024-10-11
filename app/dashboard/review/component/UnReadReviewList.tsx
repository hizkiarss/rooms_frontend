"use client";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { useUnReadReviewByPropertyId } from "@/hooks/Review/useUnReadReviewByPropertyId";
import React from "react";
import ReplyReviewForm from "./ReplyReviewForm";
import UnReadReviewItem from "./UnreadReviewItem";

const UnReadReviewList = () => {
  const { data, error, isLoading, refetch } = useUnReadReviewByPropertyId();

  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  // console.log("Data state:", data);
  // if (useUnReadReviewByPropertyId() === null) {
  //   console.log("gaada datanya broku");
  //   return <NoDataFoundAnimation />;
  // }

  const refreshTransactions = () => {
    refetch();
  };

  return (
    <div>
      {data && data.length > 0 && (
        <>
          <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
            New Reviews Awaiting Your Attention
          </h4>
          {data.map((review) => (
            <div key={review.id} className="mb-2">
              <UnReadReviewItem
                propertyName={review.properties.name}
                rating={review.rating}
                userName={review.users.username}
                feedback={review.feedback}
                reviewId={review.id}
                propertyId={review.properties.id as string}
                onRefresh={refreshTransactions}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UnReadReviewList;
