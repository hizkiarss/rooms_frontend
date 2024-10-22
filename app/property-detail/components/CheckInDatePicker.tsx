"use client";

import * as React from "react";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
} from "date-fns";
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
import { useGetCalendarPrice } from "@/hooks/rooms/useGetCalendarPrice";
import useRefetchRooms from "@/hooks/useRefetchRooms";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function CheckInDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement> & {}) {
  const params = useSearchParams();
  const router = useRouter();

  const fromString = params.get("from");
  const toString = params.get("to");

  const fromDate = fromString ? new Date(fromString) : undefined;
  const toDate = toString ? new Date(toString) : undefined;

  const today = startOfDay(new Date());

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromDate && isAfter(fromDate, today) ? fromDate : today,
    to: toDate && isAfter(toDate, today) ? toDate : addDays(today, 1),
  });

  const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
    refetch: false,
    from: null,
    to: null,
    propertyId: null,
  });

  const [searchInput, setSearchInput] = React.useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    propertyId: refetchStatus.propertyId || "",
  });

  const { data, refetch: refetchCalendarPrice } =
    useGetCalendarPrice(searchInput);

  const priceMap = React.useMemo(() => {
    if (!data) return new Map();
    return new Map(data.map((item) => [item.date, item.price]));
  }, [data]);

  const handleMonthChange = (newMonth: Date) => {
    const newMonthNumber = newMonth.getMonth() + 1;
    const newYear = newMonth.getFullYear();
    setSearchInput((prev) => ({
      ...prev,
      month: newMonthNumber,
      year: newYear,
    }));
  };

  useEffect(() => {
    console.log("Refetching prices for:", searchInput.month, searchInput.year);
    refetchCalendarPrice();
  }, [searchInput]);

  useEffect(() => {
    if (date?.from && date?.to) {
      const searchParams = new URLSearchParams(params);
      searchParams.set("from", format(date.from, "yyyy-MM-dd"));
      searchParams.set("to", format(date.to, "yyyy-MM-dd"));
      router.replace(`?${searchParams.toString()}`);
    }
  }, [date, params, router]);

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
                  Check in date
                </p>
                {date?.from ? (
                  format(date.from, "LLL dd, y")
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            onMonthChange={handleMonthChange}
            disabled={(date) => isBefore(date, startOfDay(new Date()))}
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
                        const newDateRange = { from: dayDate };
                        setDate(newDateRange);
                        setRefetchStatus({
                          ...refetchStatus,
                          from: newDateRange.from,
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
