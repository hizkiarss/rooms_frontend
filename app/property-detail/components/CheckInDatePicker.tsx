"use client";

import * as React from "react";
import { addDays, format, parseISO } from "date-fns";
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

// export function CheckInDatePicker({
//   className,
// }: React.HTMLAttributes<HTMLDivElement> & {}) {
//   const params = useSearchParams();
//   const fromString = params.get("from");
//   const toString = params.get("to");
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2024, 12, 20),
//     to: addDays(new Date(2024, 12, 21), 20),
//   });

//   const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
//     refetch: false,
//     from: null,
//     to: null,
//     propertyId: null,
//   });

//   const [searchInput, setSearchInput] = React.useState({
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear(),
//     propertyId: refetchStatus.propertyId || "",
//   });

//   const { data, refetch: refetchCalendarPrice } =
//     useGetCalendarPrice(searchInput);

//   const priceMap = React.useMemo(() => {
//     if (!data) return new Map();
//     return new Map(data.map((item) => [item.date, item.price]));
//   }, [data]);

//   const handleMonthChange = (newMonth: Date) => {
//     const newMonthNumber = newMonth.getMonth() + 1;
//     const newYear = newMonth.getFullYear();
//     setSearchInput((prev) => ({
//       ...prev,
//       month: newMonthNumber,
//       year: newYear,
//     }));
//   };

//   useEffect(() => {
//     console.log("Refetching prices for:", searchInput.month, searchInput.year);
//     console.log("Refetching prices for:", searchInput.month, searchInput.year);
//     refetchCalendarPrice();
//   }, [searchInput]);

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             className={cn(
//               " w-full h-fit justify-between text-left font-normal md:py-4 bg-white text-greenr hover:bg-white",
//               !date && "text-muted-foreground"
//             )}>
//             <div className="flex items-center md:gap-1">
//               <CalendarIcon className="mr-2 h-3 w-3 md:h-6 md:w-6" />
//               <div className="flex flex-col text-xs md:text-sm">
//                 <p className={"text-xs md:text-sm font-semibold"}>
//                   Check in date
//                 </p>
//                 {date?.from ? (
//                   format(date.from, "LLL dd, y")
//                 ) : (
//                   <span>Pick a date</span>
//                 )}
//               </div>
//             </div>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={1}
//             onMonthChange={handleMonthChange}
//             components={{
//               Day: ({
//                 date,
//                 selected,
//                 modifiers,
//               }: {
//                 date: Date;
//                 selected?: boolean;
//                 modifiers?: any;
//               }) => {
//                 const formattedDate = format(date, "yyyy-MM-dd");
//                 const price = priceMap.get(formattedDate) / 1000;
//                 const isSelected = selected && modifiers.selected;
//                 return (
//                   <div
//                     onClick={() => {
//                       const newDateRange = { from: date };
//                       setDate(newDateRange);
//                       setRefetchStatus({
//                         ...refetchStatus,
//                         from: newDateRange.from,
//                       });
//                     }}
//                     className={`${
//                       isSelected
//                         ? "bg-greenr text-white rounded-full"
//                         : "hover:bg-gray-100"
//                     }`}>
//                     <div>{date.getDate()}</div>
//                     {price !== undefined && !isNaN(price) ? (
//                       <div style={{ fontSize: "0.8em", color: "#555" }}>
//                         {price}
//                       </div>
//                     ) : null}
//                   </div>
//                 );
//               },
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

export function CheckInDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement> & {}) {
  const params = useSearchParams();
  const router = useRouter();

  // Get "from" and "to" values from URL params
  const fromString = params.get("from");
  const toString = params.get("to");

  // Convert "from" and "to" values to Date objects
  const fromDate = fromString ? new Date(fromString) : undefined;
  const toDate = toString ? new Date(toString) : undefined;

  // Set initial date range state using the parsed URL parameters or fallback to default
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      fromDate && !isNaN(fromDate.getTime())
        ? fromDate
        : new Date(2024, 11, 20), // Default to Dec 20, 2024
    to:
      toDate && !isNaN(toDate.getTime())
        ? toDate
        : addDays(new Date(2024, 11, 20), 20), // Default to Dec 21, 2024 + 20 days
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

  // Update URL parameters when date changes
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
              " w-full h-fit justify-between text-left font-normal md:py-4 bg-white text-greenr hover:bg-white",
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
            components={{
              Day: ({
                date,
                selected,
                modifiers,
              }: {
                date: Date;
                selected?: boolean;
                modifiers?: any;
              }) => {
                const formattedDate = format(date, "yyyy-MM-dd");
                const price = priceMap.get(formattedDate) / 1000;
                const isSelected = selected && modifiers.selected;
                return (
                  <div
                    onClick={() => {
                      const newDateRange = { from: date };
                      setDate(newDateRange);
                      setRefetchStatus({
                        ...refetchStatus,
                        from: newDateRange.from,
                      });
                    }}
                    className={`${
                      isSelected
                        ? "bg-greenr text-white rounded-full"
                        : "hover:bg-gray-100"
                    }`}>
                    <div>{date.getDate()}</div>
                    {price !== undefined && !isNaN(price) ? (
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
