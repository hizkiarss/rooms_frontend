import React from "react";
import PropertyReservationDetailCard from "./component/PropertyReservationDetailCard";
import Reservation from "./component/Reservation";

import ReservationDetailsCard from "./component/ReservationDetailsCard";

const page = () => {
  return (
    <div className="min-h-screen py-8 px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <Reservation />
    </div>
  );
};

export default page;
