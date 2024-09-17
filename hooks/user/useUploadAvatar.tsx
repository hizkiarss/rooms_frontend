import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { UPLOAD_AVATAR } from "@/hooks/graphQL/mutations";
import {UserType} from "@/types/users/Usertype";

interface UploadAvatarInput {
    email: string;
    imgUrl: string;
}

interface UploadAvatarResponse {
    uploadAvatar: {
        success: boolean;
        avatarUrl: string;
    };
}

export function useUploadAvatar() {
    const queryClient = useQueryClient();

    return useMutation<UserType, Error, UploadAvatarInput>({
        mutationFn: async ({ email, imgUrl }) => {
            const response = await graphqlClient.request<UploadAvatarResponse>(
                UPLOAD_AVATAR,
                { email, imgUrl }
            );
            return response;
        },
        // onSuccess: (data) => {
        //     // Assuming you have a user query that needs to be updated
        //     queryClient.invalidateQueries({ queryKey: ["user"] });
        //     console.log("success");
        //     // // You can also update the user avatar directly in the cache if needed
        //     // queryClient.setQueryData(["user"], (oldData: any) => ({
        //     //     ...oldData,
        //     //     avatarUrl: data.uploadAvatar.avatarUrl,
        //     // }));
        // },
        onError: (error) => {
            // Handle any errors here, e.g., show a toast notification
            console.error("Failed to upload avatar:", error);
        },
    });
}