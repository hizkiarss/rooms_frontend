import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {ADD_ROOM_PICTURES} from "@/hooks/graphQL/mutations";


interface AddRoomPicturesInput {
    roomName: string;
    propertyId: string;
    roomPicture: string[];
}

export function useAddRoomPictures() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, AddRoomPicturesInput>({
        mutationKey: ["addRoomPicture"],
        mutationFn: async (input) => {
            const response = await graphqlClient.request<{ addRoomPictures: string }>(
                ADD_ROOM_PICTURES,
                {input},
            );
            return response.addRoomPictures;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["roomPicture", "addRoomPicture"]});
            console.log("Property pictures added successfully", data);
        },
        onError: (error) => {
            console.error("Failed to add property pictures:", error);
        },
    });
}