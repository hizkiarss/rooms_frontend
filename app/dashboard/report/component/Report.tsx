"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BedSingle,
  CalendarIcon,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Overview from "./Overview";
import DateRangePicker from "../../component/DateRangePicker";
import Buttons from "@/components/Buttons";
import RevenueCard from "./RevenueCard";
import TotalRoomsCard from "./TotalRoomsCard";
type TabName =
  | "Overview"
  | "Property Report"
  | "Sales Report"
  | "Notifications";

const Report = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "Property Report":
        return <div>Property Report Content</div>;
      case "Sales Report":
        return <div>Sales Report Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold w-1/2">Report</h1>
      <div className="flex items-center justify-start pr-2">
        <div className="flex items-center space-x-2 w-2/3 pr-2">
          <DateRangePicker />
          <Buttons
            value={"Download"}
            className="w-[300px] text-center font-normal"
          />
        </div>
      </div>

      <div className="flex space-x-2">
        {(["Overview", "Property Report", "Sales Report"] as TabName[]).map(
          (tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded ${
                activeTab === tab ? "bg-greenr text-white" : "text-greenr"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RevenueCard />
        <TotalRoomsCard />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1200</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
          </CardContent>
        </Card>
      </div>

      {renderContent()}
    </div>
  );
};

export default Report;
