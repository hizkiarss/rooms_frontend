"use client"

import * as React from "react"
import {addDays, format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import useSearchInput from "@/hooks/useSearchInput";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export function DatePickerWithRange({
                                        className,
                                    }: React.HTMLAttributes<HTMLDivElement>) {
    const [isHomepage, setIsHomepage] = useState<boolean>(false);

    const {searchInput, setSearchInput} = useSearchInput({
        ready: false,
        searchButtonHit: false,
        totalProperties: null,
        endPrice: null,
        startPrice: null,
        sortBy: null,
        category: null,
        includeBreakfast: null,
        rating: null,
        travellersParam: null,
        cityParam: null,
        dateRangeParam: null,
        isHomepage: null,
        closed: null,
        setClosed: () => {},
        setIsHomepage: () => {
        },
        setCityParam: () => {
        },
        setDateRangeParam: () => {
        },
        setTravellersParam: () => {
        },
        setRating: () => {
        },
        setIncludeBreakfast: () => {
        },
        setCategory: () => {
        },
        setEndPrice: () => {
        },
        setStartPrice: () => {
        },
        setSortBy: () => {
        },
        setTotalProperties: () => {
        },
        setReady: () => {
        },
        setSearchButtonHit: () => {
        },
    });

    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        if (searchInput.dateRangeParam?.from && searchInput.dateRangeParam?.to) {
            return {
                from: searchInput.dateRangeParam.from,
                to: searchInput.dateRangeParam.to,
            };
        }
        return {
            from: new Date(),
            to: addDays(new Date(), 1),
        };
    });

    const handleSelect = (selected: DateRange | undefined) => {
        setDate(selected);
        setSearchInput({ ...searchInput, dateRangeParam: selected });
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full h-full items-start justify-start border-black rounded-xl",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="mr-2 h-6 w-6"/>
                            <div className="flex flex-col items-start">
                                <p>Pick a date</p>
                                {searchInput.dateRangeParam?.from ? (
                                    searchInput.dateRangeParam.to ? (
                                        <>
                                            {format(searchInput.dateRangeParam.from, "LLL dd, y")} -{" "}
                                            {format(searchInput.dateRangeParam.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(searchInput.dateRangeParam.from, "LLL dd, y")
                                    )
                                ) : date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    ""
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
                        onSelect={handleSelect} // Pass selected date to handleSelect
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
