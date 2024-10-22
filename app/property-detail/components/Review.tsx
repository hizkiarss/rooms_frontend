import React from "react";
import ReviewComponent from "@/app/dummy/ReviewComponent";

interface ReviewProps {
  propertyId: string;
}
const Review: React.FC<ReviewProps> = ({ propertyId }) => {
  return (
    <div
      id="review"
      className=" scroll-mt-20 py-10 border-y my-10 border-slate-300">
      <h2 className={"text-xl md:text-2xl font-semibold"}>Reviews</h2>
      <ReviewComponent propertyId={propertyId}></ReviewComponent>
    </div>
  );
};

export default Review;
