
import { graphqlClient } from "../graphQL/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import {RoomType} from "@/types/rooms/RoomsType";
import { GET_10_RANDOM_AVAILABLE_ROOMS } from "@/hooks/graphQL/queries";

export function useGet10RandomAvailableRooms() {
    return useQuery<RoomType[], Error>({
        queryKey: ["randomAvailableRooms"],
        queryFn: async () => {
            const response = await graphqlClient.request<{ get10RandomAvailableRooms: RoomType[] }>(
                GET_10_RANDOM_AVAILABLE_ROOMS
            );
            return response.get10RandomAvailableRooms;
        },
        meta: {
            onSuccess: (data: RoomType[]) => {
                console.log("Random available rooms fetched successfully", data);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch random available rooms:", error);
            },
        },
    });
}