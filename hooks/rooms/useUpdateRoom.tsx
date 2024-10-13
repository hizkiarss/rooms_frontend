import {useMutation, useQueryClient} from "@tanstack/react-query";
import {gql} from 'graphql-request';
import {graphqlClient} from "../graphQL/graphqlClient";
import {UPDATE_ROOM} from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";


interface UpdateRoomInput {
    name?: string;
    description?: string;
    capacity?: number;
    roomNumber?: string;
    price?: number;
    includeBreakfast?: boolean;
    bedType?: string;
    roomArea?: number;
}

interface UpdateRoomVariables {
    id: string;
    input: UpdateRoomInput;
    email: string;
}

export function useUpdateRoom() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, UpdateRoomVariables>({
        mutationKey: ["updateRoom"],
        mutationFn: async (variables) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ updateRoom: string }>(
                UPDATE_ROOM,
                variables
            );
            return response.updateRoom;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["room", "rooms"] });
            console.log("Room updated successfully", data);
        },
        onError: (error) => {
            console.error("Failed to update room:", error);
        },
    });
}