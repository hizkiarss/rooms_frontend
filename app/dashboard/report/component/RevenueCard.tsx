"use client";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRevenueByPropertyId } from "@/hooks/report/useRevenueByPropertyId";
import useSelectedDate from "@/hooks/useSelectedDate";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { DollarSign } from "lucide-react";

const RevenueCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { selectedDates } = useSelectedDate();
  const currentYear = new Date().getFullYear();

  const { data: revenue, isLoading } = useRevenueByPropertyId(
    selectedProperty || "",
    selectedDates?.startDate
      ? new Date(selectedDates.startDate)
      : new Date(currentYear, 0, 1),
    selectedDates?.endDate
      ? new Date(selectedDates.endDate)
      : new Date(currentYear, 11, 31)
  );
  const formattedRevenue = (value: number | 0) => {
    if (value === null) return "Rp. 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="w-4" />
      </CardHeader>
      <CardContent className="break-words overflow-auto">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="text-2xl font-bold">
            {formattedRevenue(revenue || 0)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueCard;
