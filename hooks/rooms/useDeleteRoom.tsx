import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {DELETE_ROOM} from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";

interface DeleteRoomVariables {
    id: string;
    email: string;
}

export function useDeleteRoom() {
    const queryClient = useQueryClient();
    const {data: session} = useSession();

    return useMutation<string, Error, DeleteRoomVariables>({
        mutationKey: ["deleteRoom"],
        mutationFn: async ({id, email}) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ deleteRoom: string }>(
                DELETE_ROOM,
                {id, email}
            );
            return response.deleteRoom;
        },
        onSuccess: (data) => {
            // Invalidate relevant queries after deleting the room
            queryClient.invalidateQueries({queryKey: ["rooms"]});
            console.log("Room deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to delete room:", error);
        },
    });
}