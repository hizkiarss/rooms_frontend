import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { UPLOAD_AVATAR } from "@/hooks/graphQL/mutations";

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

    return useMutation<UploadAvatarResponse, Error, UploadAvatarInput>({
        mutationFn: async ({ email, imgUrl }) => {
            const response = await graphqlClient.request<UploadAvatarResponse>(
                UPLOAD_AVATAR,
                { email, imgUrl }
            );
            return response;
        },
        onSuccess: (data) => {
            // Assuming you have a user query that needs to be updated
            queryClient.invalidateQueries({ queryKey: ["user"] });
            console.log("Avatar uploaded successfully", data.uploadAvatar.avatarUrl);
        },
        onError: (error) => {
            console.error("Failed to upload avatar:", error);
        },
    });
}