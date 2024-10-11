import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import {DELETE_ROOM_PICTURES} from "@/hooks/graphQL/mutations";


interface DeleteRoomPicturesVariables {
    roomPictureIds: string[];
}

export function useDeleteRoomPictures() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, DeleteRoomPicturesVariables>({
        mutationKey: ["deleteRoomPictures"],
        mutationFn: async ({ roomPictureIds }) => {
            const response = await graphqlClient.request<{ deleteRoomPicture: string }>(
                DELETE_ROOM_PICTURES,
                { roomPictureIds }
            );
            return response.deleteRoomPicture;
        },
        onSuccess: (data) => {
            // Invalidate relevant queries after deleting the pictures
            queryClient.invalidateQueries({ queryKey: ["roomPictures"] });
            console.log("Room pictures deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to delete room pictures:", error);
        },
    });
}
