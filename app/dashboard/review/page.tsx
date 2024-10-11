import React from "react";
import ReplyReviewForm from "./component/ReplyReviewForm";
import ReviewList from "./component/ReviewList";
import UnReadReviewItem from "./component/UnreadReviewItem";
import UnReadReviewList from "./component/UnReadReviewList";

const page = () => {
  return (
    <div className="p-4">
      <UnReadReviewList />
      <ReviewList />
    </div>
  );
};

export default page;
