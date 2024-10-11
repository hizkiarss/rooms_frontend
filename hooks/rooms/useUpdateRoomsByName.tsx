import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {UPDATE_ROOMS_BY_NAME} from "@/hooks/graphQL/mutations";

interface UpdateRoomVariables {
    name: string;
    input: {
        name:string;
        description: string;
        capacity: number;
        price: number;
        roomArea: number;
        includeBreakfast: boolean;
        bedType: string;
    };
    email: string;
    propertyId: string;
}

export function useUpdateRoomsByName() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, UpdateRoomVariables>({
        mutationKey: ["updateRoomsByName"],
        mutationFn: async ({ name, input, email, propertyId }) => {
            const response = await graphqlClient.request<{ updateRoomsByName: string }>(
                UPDATE_ROOMS_BY_NAME,
                { name, input, email, propertyId }
            );
            return response.updateRoomsByName;
        },
        onSuccess: (data) => {
            // Invalidate relevant queries after updating rooms
            queryClient.invalidateQueries({ queryKey: ["rooms", "room", "availableRooms", "Room"] });
            console.log("Room updated successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to update room:", error);
        },
    });
}
