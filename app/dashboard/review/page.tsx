import React from "react";
import ReplyReviewForm from "./component/ReplyReviewForm";
import ReviewList from "./component/ReviewList";
import UnReadReviewItem from "./component/UnreadReviewItem";
import UnReadReviewList from "./component/unReadReviewList";

const page = () => {
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[100px] space-y-5">
      <UnReadReviewList />
      <ReviewList />
    </div>
  );
};

export default page;
