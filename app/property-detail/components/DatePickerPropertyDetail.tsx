"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Buttons from "@/components/Buttons";

export function DatePickerPropertyDetail({
                                        className,
                                    }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>

                    <Button
                        id="date"
                        // variant={""}
                        className={cn(
                            "w-full h-fit justify-between text-left font-normal py-4",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center  gap-1 ">
                            <CalendarIcon className="mr-2 h-6 w-6"/>

                            <div className="flex flex-col text-base ">
                                <p className={"text-sm font-semibold"}>Check in & Check out</p>

                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </div>
                        </div>
                        <Buttons className={"bg-white border-white !text-greenr"} value={"Change"}/>


                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
