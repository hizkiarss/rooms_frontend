import React from 'react';
import ReviewComponent from "@/app/dummy/ReviewComponent";

const Review = () => {
    return (
        <div id="review" className=" scroll-mt-20 py-10 border-y my-10 border-slate-300">
        <h2 className={"text-2xl font-semibold"}>Reviews</h2>
            <ReviewComponent></ReviewComponent>
        </div>
    );
};

export default Review;