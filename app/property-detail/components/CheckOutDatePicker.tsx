"use client";

import * as React from "react";
import { addDays, format, isAfter, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Buttons from "@/components/Buttons";
import { useGetCalendarPrice } from "@/hooks/rooms/useGetCalendarPrice";
import useRefetchRooms from "@/hooks/useRefetchRooms";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FlexibleDateRange = {
  from?: Date;
  to?: Date;
};

export function CheckoutDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const params = useSearchParams();
  const router = useRouter();

  const fromString = params.get("from");
  const toString = params.get("to");

  const fromDate = fromString ? new Date(fromString) : undefined;
  const toDate = toString ? new Date(toString) : undefined;

  const today = startOfDay(new Date());

  const [date, setDate] = React.useState<FlexibleDateRange>({
    from: fromDate && isAfter(fromDate, today) ? fromDate : today,
    to: toDate && isAfter(toDate, today) ? toDate : addDays(today, 1),
  });

  const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
    refetch: false,
    from: null,
    to: null,
    propertyId: null,
  }) as any;

  const [searchInput, setSearchInput] = React.useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    propertyId: refetchStatus.propertyId || "",
  });

  const { data, refetch: refetchCalendarPrice } = useGetCalendarPrice(
    searchInput
  ) as any;

  const priceMap = React.useMemo(() => {
    if (!data) return new Map();
    return new Map(data.map((item: any) => [item.date, item.price]));
  }, [data]);

  const handleMonthChange = (newMonth: Date) => {
    setSearchInput((prev) => ({
      ...prev,
      month: newMonth.getMonth() + 1,
      year: newMonth.getFullYear(),
    }));
  };

  useEffect(() => {
    console.log("Refetching prices for:", searchInput.month, searchInput.year);
    refetchCalendarPrice();
  }, [searchInput, refetchCalendarPrice]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "w-full h-fit justify-between text-left font-normal md:py-4 bg-white text-greenr hover:bg-white",
              !date && "text-muted-foreground"
            )}>
            <div className="flex items-center md:gap-1">
              <CalendarIcon className="mr-2 h-3 w-3 md:h-6 md:w-6" />
              <div className="flex flex-col text-xs md:text-sm">
                <p className={"text-xs md:text-sm font-semibold"}>
                  Check out date
                </p>
                {date.to ? (
                  format(date.to, "LLL dd, y")
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.to}
            selected={date as DateRange}
            onSelect={(newDate: DateRange | undefined) => {
              if (newDate?.to) {
                const newDateRange: FlexibleDateRange = {
                  ...date,
                  to: newDate.to,
                };
                setDate(newDateRange);
                setRefetchStatus((prevStatus: any) => ({
                  ...prevStatus,
                  to: newDate.to,
                }));
              }
            }}
            numberOfMonths={1}
            onMonthChange={handleMonthChange}
            disabled={(currentDate) =>
              isBefore(currentDate, startOfDay(new Date()))
            }
            components={{
              Day: ({
                date: dayDate,
                selected,
                modifiers,
              }: {
                date: Date;
                selected?: boolean;
                modifiers?: any;
              }) => {
                const formattedDate = format(dayDate, "yyyy-MM-dd");
                const price = priceMap.get(formattedDate) / 1000;
                const isSelected = selected && modifiers.selected;
                const isPast = isBefore(dayDate, startOfDay(new Date()));

                return (
                  <div
                    onClick={() => {
                      if (!isPast) {
                        const newDateRange: FlexibleDateRange = {
                          ...date,
                          to: dayDate,
                        };
                        setDate(newDateRange);
                        setRefetchStatus({
                          ...refetchStatus,
                          to: newDateRange.to,
                        });
                      }
                    }}
                    className={`
                      ${isSelected ? "bg-greenr text-white rounded-full" : ""}
                      ${
                        isPast
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }
                      ${!isPast && !isSelected ? "cursor-pointer" : ""}
                    `}>
                    <div>{dayDate.getDate()}</div>
                    {price !== undefined && !isNaN(price) && !isPast ? (
                      <div style={{ fontSize: "0.8em", color: "#555" }}>
                        {price}
                      </div>
                    ) : null}
                  </div>
                );
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
