import {useMutation} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {RESET_PASSWORD} from "@/hooks/graphQL/mutations";
import {UserType} from "@/types/users/Usertype";
import {useQueryClient} from "@tanstack/react-query";
import {ResetPasswordRequest} from "@/types/users/ResetPasswordRequest";

interface ResetPasswordVariables {
    email: String;
    input: ResetPasswordRequest;
}

export function useResetPassword() {
    const queryClient = useQueryClient();

    return useMutation<String, Error, ResetPasswordVariables>({
        mutationFn: async ({email, input}) => {
            const response = await graphqlClient.request<{ resetPassword: String }>(
                    RESET_PASSWORD,
                    {email, input}
                )
            ;
            return response.resetPassword;
        },
        onSuccess: (data) => {
            console.log(Response + "User information updated successfully");
        },
        onError: (error) => {
            console.error("Failed to update user information:", error);

            return error
        },
    })
}