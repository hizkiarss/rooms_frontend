import React from "react";
import ReservationDetailsCard from "./component/ReservationDetailsCard";

const page = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <ReservationDetailsCard
        orderId="orderID"
        checkIn="cekin"
        checkOut="cekot"
        guestName="oblaay"
        roomType="room type"
        guestCount={1}
      />
    </div>
  );
};

export default page;
