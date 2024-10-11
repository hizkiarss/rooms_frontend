"use client";

import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_AVAILABLE_ROOMS } from "@/hooks/graphQL/queries";
import { RoomType } from "@/types/rooms/RoomsType"; // Assuming you have a Room type
import { useQuery } from "@tanstack/react-query";



export function useGetRoomsByPropertyId(id: string) {
    return useQuery<RoomType[], Error>({
        queryKey: ["availableRooms", id],
        queryFn: async () => {

            const response = await graphqlClient.request<{ getRoomsByPropertiesId: RoomType[] }>(
                GET_AVAILABLE_ROOMS,
                {id}
            );
            return response.getRoomsByPropertiesId;
        },
        meta:{
            onSuccess: (roomData: RoomType[]) => {
                console.log("Available rooms fetched successfully", roomData);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch available rooms:", error);
            },
        }});
}
