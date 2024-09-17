import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { UserType } from "@/types/users/Usertype";
import { UPDATE_USER_INFORMATION } from "@/hooks/graphQL/mutations";
import { Gender } from "@/types/gender/Gender";

interface UpdateInfoInput {
    mobileNumber: string;
    name: string;
    gender: Gender;
    dateOfBirth: Date;
}

interface UpdateUserInformationVariables {
    input: UpdateInfoInput;
    email: String;
}

export function useUploadUserInformation() {
    const queryClient = useQueryClient();

    return useMutation<UserType, Error, UpdateUserInformationVariables>({
        mutationFn: async ({ input,email }) => {
            const response = await graphqlClient.request<{ updateUserInformation: UserType }>(
                UPDATE_USER_INFORMATION,
                { input, email }
            );
            return response.updateUserInformation;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            console.log("User information updated successfully");
        },
        onError: (error) => {
            console.error("Failed to update user information:", error);
        },
    });
}