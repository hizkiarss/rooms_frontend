import SubmitSuccessAnimation from "@/components/animations/SubmitSuccessAnimation";
import { useReviewByPropertyId } from "@/hooks/Review/useReviewByPropertyId";
import { useUnReadReviewByPropertyId } from "@/hooks/Review/useUnReadReviewByPropertyId";
import React from "react";
import UserReviewForm from "../my-order/component/UserReviewForm";
import LocationDisplay from "./LocationDisplay";
import LocationPicker from "./LocationPicker";
import ReviewComponent from "./ReviewComponent";

// const reviews = [
//   {
//     id: "1",
//     rating: 10,
//     author: "Lee",
//     date: "Aug 25, 2024",
//     feedback:
//       "The hotel staff were friendly and the hotel was great. It was a satisfying trip for my family.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "2",
//     rating: 8,
//     author: "Sara",
//     date: "Jul 14, 2024",
//     feedback:
//       "The location was perfect, but the room service could be improved.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "3",
//     rating: 6,
//     author: "Mark",
//     date: "Jun 22, 2024",
//     feedback: "The hotel was decent, but the breakfast options were limited.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "4",
//     rating: 4,
//     author: "Emily",
//     date: "May 10, 2024",
//     feedback:
//       "The room was clean, but the noise from the street was unbearable.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "5",
//     rating: 9,
//     author: "James",
//     date: "Apr 30, 2024",
//     feedback:
//       "The hotel exceeded my expectations. The spa was particularly amazing.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "6",
//     rating: 2,
//     author: "Anna",
//     date: "Mar 18, 2024",
//     feedback:
//       "The experience was disappointing. The room was not ready when we arrived. . We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.. We’re glad you enjoyed your stay overall.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "7",
//     rating: 7,
//     author: "David",
//     date: "Feb 14, 2024",
//     feedback: "The hotel was nice, but the Wi-Fi was a bit slow.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "8",
//     rating: 5,
//     author: "Sophia",
//     date: "Jan 5, 2024",
//     feedback:
//       "The hotel was okay, but nothing special. The decor felt a bit outdated.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "9",
//     rating: 3,
//     author: "John",
//     date: "Dec 20, 2023",
//     feedback:
//       "The check-in process was slow, and the staff seemed disinterested.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
//   {
//     id: "10",
//     rating: 1,
//     author: "Laura",
//     date: "Nov 10, 2023",
//     feedback:
//       "This was the worst stay ever. The room was dirty and the service was terrible.",
//     reply:
//       "Dear Laura, We’re truly sorry to hear about your experience. This is not reflective of our usual standards. We’ll investigate this matter further and take immediate action. We hope you’ll give us another chance in the future. Sincerely, Jon Yau, Rooms Division Manager",
//   },
// ];

const page = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      {/* <LocationPicker /> */}
      <ReviewComponent />
      {/* <LocationDisplay latitude={-6.17511} longitude={106.865036} /> */}
      {/* <UserReviewForm bookingCode="XkAD9nRp" userId="1" propertyId="1" /> */}
      {/* <SubmitSuccessAnimation message="Review Submited" /> */}
    </div>
  );
};

export default page;
