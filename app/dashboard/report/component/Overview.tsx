"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
type OverviewData = { month: string; desktop: number }[];
const overviewData: OverviewData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 209 },
  { month: "August", desktop: 186 },
  { month: "September", desktop: 305 },
  { month: "October", desktop: 237 },
  { month: "November", desktop: 73 },
  { month: "December", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#007989",
  },
} satisfies ChartConfig;
type RecentSale = {
  name: string;
  email: string;
  amount: number;
};
const recentSales: RecentSale[] = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: 1999.0 },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: 39.0 },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.0,
  },
  { name: "William Kim", email: "will@email.com", amount: 99.0 },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: 39.0 },
];
const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={overviewData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <p className="text-sm text-muted-foreground">
            You made 265 sales this month.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{sale.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {sale.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{sale.email}</p>
                </div>
                <div className="ml-auto font-medium">
                  +${sale.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
