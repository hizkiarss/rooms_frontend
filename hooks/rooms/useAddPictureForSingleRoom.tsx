import {useMutation, useQueryClient} from "@tanstack/react-query";
import {gql} from "graphql-request";
import {graphqlClient} from "../graphQL/graphqlClient";
import {useSession} from "next-auth/react";
import {ADD_PICTURES_FOR_SINGLE_ROOM} from "@/hooks/graphQL/mutations";

// const ADD_PICTURES_FOR_SINGLE_ROOM = gql`
//   mutation addPicturesForSingleRoom($roomId: ID!, $imgUrls: [String]!) {
//     addPicturesForSingleRoom(roomId: $roomId, imgUrls: $imgUrls)
//   }
// `;

interface AddPicturesVariables {
    roomId: string;
    imgUrls: string[];
}

export function useAddPicturesForSingleRoom() {
    const queryClient = useQueryClient();
    const {data: session} = useSession();

    return useMutation<string, Error, AddPicturesVariables>({
        mutationKey: ["addPicturesForSingleRoom"],
        mutationFn: async (variables) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ addPicturesForSingleRoom: string }>(
                ADD_PICTURES_FOR_SINGLE_ROOM,
                variables
            );
            return response.addPicturesForSingleRoom;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["room", "rooms", "Room"]});
            console.log("Pictures added successfully", data);
        },
        onError: (error) => {
            console.error("Failed to add pictures:", error);
        },
    });
}
