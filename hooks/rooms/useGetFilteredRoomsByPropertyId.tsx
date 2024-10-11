"use client";

import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_FILTERED_ROOMS_BY_PROPERTY_ID } from "@/hooks/graphQL/queries";
import { PagedRoomResult } from "@/types/rooms/PagedRoomResult"; // Assuming you have a Room type
import { useQuery } from "@tanstack/react-query";


interface variables {
    propertyId: string
    isAvailable: boolean | null
    roomName: string | null
    pageSize : number
    pageNumber : number
}

export function useGetFilteredRoomsByPropertyId(variables: variables) {
    return useQuery<PagedRoomResult, Error>({
        queryKey: ["availableRooms", variables],
        queryFn: async () => {

            const response = await graphqlClient.request<{ getFilteredRoomsByPropertyId: PagedRoomResult }>(
                GET_FILTERED_ROOMS_BY_PROPERTY_ID,
                variables
            );
            return response.getFilteredRoomsByPropertyId;
        },
        meta:{
            onSuccess: (roomData: PagedRoomResult) => {
                console.log("Available rooms fetched successfully", roomData);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch available rooms:", error);
            },
        }});
}
