"use client";

import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_CALENDAR_PRICE } from "@/hooks/graphQL/queries";
import { useQuery } from "@tanstack/react-query";
import {CalendarPriceType} from "@/types/rooms/CalendarPriceType";
interface GetCalendarPriceInput {
    year: number;
    month: number;
    propertyId: string;
}

export function useGetCalendarPrice(variables: GetCalendarPriceInput) {
    return useQuery<CalendarPriceType[], Error>({
        queryKey: ["calendarPrice", variables.year, variables.month, variables.propertyId],
        queryFn: async () => {

            const response = await graphqlClient.request<{ getCalendarPrice: CalendarPriceType[] }>(
                GET_CALENDAR_PRICE,
                variables
            );
            return response.getCalendarPrice;
        },
        meta: {
            onSuccess: (data: CalendarPriceType) => {
                console.log("Calendar prices fetched successfully", data);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch calendar prices:", error);
            },
        },
    });
}
