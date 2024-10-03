import React from "react";
import LatestTransactionsCard from "./LatestTransactionsCard";
import MonthlyTransactionsCard from "./MonthlyTransactionsCard";
import MostBookedRoomsCard from "./MostBookedRoomsCard";
import UpcomingBookings from "./UpcomingBookings";

const Overview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MonthlyTransactionsCard />
      <UpcomingBookings />
      <LatestTransactionsCard />
      <MostBookedRoomsCard />
    </div>
  );
};

export default Overview;
