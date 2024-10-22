import React from "react";
import ReviewList from "./component/ReviewList";
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
