"use client";

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_ROOMS_TYPES_BY_PROPERTY_ID} from "@/hooks/graphQL/queries";
import {useQuery} from "@tanstack/react-query";


export function useGetRoomsTypesByPropertyId(propertyId: string) {
    return useQuery<string[], Error>({
        queryKey: ["availableRooms", propertyId],
        queryFn: async () => {

            const response = await graphqlClient.request<{ getRoomsTypesByPropertyId: string[] }>(
                GET_ROOMS_TYPES_BY_PROPERTY_ID,
                {propertyId}
            );
            return response.getRoomsTypesByPropertyId;
        },
        meta: {
            onSuccess: (roomTypesData: String[]) => {
                console.log("Available rooms fetched successfully", roomTypesData);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch available rooms:", error);
            },
        }
    });
}
