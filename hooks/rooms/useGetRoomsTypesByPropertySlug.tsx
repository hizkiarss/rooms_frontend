"use client";

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_ROOMS_TYPES_BY_PROPERTY_SLUG} from "@/hooks/graphQL/queries";
import {useQuery} from "@tanstack/react-query";


export function useGetRoomsTypesByPropertySlug(propertySlug: string) {
    return useQuery<string[], Error>({
        queryKey: ["availableRooms", propertySlug],
        queryFn: async () => {

            const response = await graphqlClient.request<{ getRoomsTypesByPropertySlug: string[] }>(
                GET_ROOMS_TYPES_BY_PROPERTY_SLUG,
                {propertySlug}
            );
            return response.getRoomsTypesByPropertySlug;
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
