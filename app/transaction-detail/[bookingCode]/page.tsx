import React from "react";
import Reservation from "../../my-order/reservation-details/[bookingCode]/component/Reservation";

const page = () => {
  return (
    <div className="min-h-screen py-8 px-5 sm:px-10 md:px-20 lg:px-[80px]">
      <Reservation />
    </div>
  );
};

export default page;
