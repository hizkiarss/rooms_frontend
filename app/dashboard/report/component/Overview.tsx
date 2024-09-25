"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMonthlyTransactions } from "@/hooks/report/useMonthlyTransactions";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import { MonthlyTransactionsType } from "@/types/transactions/MonthlyTransactionsType";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import LatestTransactionsCard from "./LatestTransactionsCard";

const monthAbbreviations = {
  JANUARY: "JAN",
  FEBRUARY: "FEB",
  MARCH: "MAR",
  APRIL: "APR",
  MAY: "MAY",
  JUNE: "JUN",
  JULY: "JUL",
  AUGUST: "AUG",
  SEPTEMBER: "SEP",
  OCTOBER: "OCT",
  NOVEMBER: "NOV",
  DECEMBER: "DEC",
};

const chartConfig = {
  transactions: {
    label: "transactions",
    color: "#007989",
  },
} satisfies ChartConfig;

const Overview: React.FC = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: monthlyTransactions } = useMonthlyTransactions(
    selectedProperty || ""
  );

  const fetchedData = monthlyTransactions?.map(
    (monthlyTransaction: MonthlyTransactionsType) => {
      const month = monthlyTransaction.month as keyof typeof monthAbbreviations;
      return {
        month:
          monthAbbreviations[month] || monthlyTransaction.month.slice(0, 3),
        transactions: monthlyTransaction.totalTransactions,
      };
    }
  );

  console.log(fetchedData);
  console.log("ini monthlynya", monthlyTransactions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={fetchedData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} domain={[0, "dataMax"]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="transactions"
                fill="var(--color-transactions)"
                radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <LatestTransactionsCard />
    </div>
  );
};

export default Overview;
