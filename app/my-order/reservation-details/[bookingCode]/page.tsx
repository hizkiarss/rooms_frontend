import React from "react";
import ReservationDetails from "./component/ReservationDetails";

const page = () => {
  return (
    <div>
      <ReservationDetails
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
