"use client";

import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotalTransactionsByPropertyId } from "@/hooks/report/useTotalTransactionsByPropertyId";
import useSelectedDate from "@/hooks/useSelectedDate";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { CreditCard } from "lucide-react";

const TotalTransactionsCard: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { selectedDates } = useSelectedDate();
  const currentYear = new Date().getFullYear();
  const { data: totalTransactions, isLoading } =
    useTotalTransactionsByPropertyId(
      selectedProperty || "",
      selectedDates?.startDate
        ? new Date(selectedDates.startDate)
        : new Date(currentYear, 0, 1),
      selectedDates?.endDate
        ? new Date(selectedDates.endDate)
        : new Date(currentYear, 11, 31)
    );
  const total = totalTransactions ?? 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <CreditCard className="w-4" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="text-2xl font-bold">{total}</div>
        )}
      </CardContent>
    </Card>
  );
};
export default TotalTransactionsCard;
