"use client";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import Overview from "./Overview";
import DateRangePicker from "../../component/DateRangePicker";
import RevenueCard from "./RevenueCard";
import TotalRoomsCard from "./TotalRoomsCard";
import TotalTransactionsCard from "./TotalTransactionsCard";
import OccupiedRoomsCard from "./OccupiedRoomsCard";
import PropertyReport from "./PropertyReport";

type TabName = "Sales Report" | "Property Report" | "Notifications";

const Report = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Sales Report");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const renderContent = () => {
    switch (activeTab) {
      case "Sales Report":
        return <Overview />;
      case "Property Report":
        return (
          <div className="flex justify-center">
            <PropertyReport />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Report
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-wrap space-x-2">
          {(["Sales Report", "Property Report"] as TabName[]).map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded ${
                activeTab === tab ? "bg-greenr text-white" : "text-greenr"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <DateRangePicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RevenueCard />
        <TotalRoomsCard />
        <TotalTransactionsCard />
        <OccupiedRoomsCard />
      </div>

      {renderContent()}
    </div>
  );
};

export default Report;
