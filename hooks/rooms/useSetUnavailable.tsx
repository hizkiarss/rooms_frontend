import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {SET_UNAVAILABLE} from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";

interface SetUnavailableVariables {
    roomId: string;
}

export function useSetUnavailable() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, SetUnavailableVariables>({
        mutationKey: ["setUnavailable"],
        mutationFn: async ({roomId}) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ setUnavailable: string }>(
                SET_UNAVAILABLE,
                {roomId}
            );
            return response.setUnavailable;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["room", "rooms", "Rooms", "availableRooms"]});
            console.log("Room set as unavailable successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to set room as unavailable:", error);
        },
    });
}
