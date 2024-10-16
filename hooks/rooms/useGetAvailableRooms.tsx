"use client";

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_AVAILABLE_ROOMS} from "@/hooks/graphQL/queries";
import {RoomType} from "@/types/rooms/RoomsType"; // Assuming you have a Room type
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";

interface GetAvailableRoomsInput {
    checkinDate: Date;
    checkOutDate: Date;
    propertyId: string;
}

export function useGetAvailableRooms(input: GetAvailableRoomsInput) {
    const {data: session} = useSession();

    return useQuery<RoomType[], Error>({
        queryKey: ["availableRooms", input.checkinDate, input.checkOutDate, input.propertyId],
        queryFn: async () => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });
            if (!(input.checkinDate instanceof Date) || isNaN(input.checkinDate.getTime())) {
                throw new Error("Invalid check-in date");
            }

            const variables = {

                checkinDate: input.checkinDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                checkOutDate: input.checkOutDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                propertyId: input.propertyId
            };
            const response = await graphqlClient.request<{ getAvailableRooms: RoomType[] }>(
                GET_AVAILABLE_ROOMS,
                variables // Use the formatted variables directly
            );
            return response.getAvailableRooms;
        },
        meta: {
            onSuccess: (roomData: RoomType[]) => {
                console.log("Available rooms fetched successfully", roomData);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch available rooms:", error);
            },
        }
    });
}
