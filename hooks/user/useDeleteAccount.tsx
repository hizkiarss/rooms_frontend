import {useMutation} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {DELETE_ACCOUNT} from "@/hooks/graphQL/mutations";
import {useQueryClient} from "@tanstack/react-query";

interface DeleteAccountVariables {
    email: String;
    password: String;
}

export function useDeleteAccount() {
    const queryClient = useQueryClient();

    return useMutation<String, Error, DeleteAccountVariables>({
        mutationFn: async ({email, password}) => {
            const response = await graphqlClient.request<{ deleteAccount: String }>(
                    DELETE_ACCOUNT,
                    {email, password}
                )
            ;
            return response.resetPassword;
        },
        onSuccess: (data) => {
            console.log(Response + "Account deleted successfully");
        },
        onError: (error) => {
            console.error("Failed to delete account:", error);

            return error
        },
    })
}