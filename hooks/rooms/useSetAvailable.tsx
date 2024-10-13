import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import {SET_AVAILABLE} from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";


export function useSetAvailable() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, { roomId: string | null }>({
        mutationKey: ["setAvailable"],
        mutationFn: async ({ roomId }) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ setAvailable: string }>(
                SET_AVAILABLE,
                { roomId }
            );
            return response.setAvailable;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["room", "rooms", "Rooms", "availableRooms"] });
            console.log("Room set as available successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to set room as available:", error);
        },
    });
}
