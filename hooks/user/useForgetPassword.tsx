import {useMutation} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {FORGET_PASSWORD} from "@/hooks/graphQL/mutations";

interface ForgetPasswordVariables {
    email: string;
    newPassword: string;
}

export function useForgetPassword() {
    return useMutation<string, Error, ForgetPasswordVariables>({
        mutationFn: async ({email, newPassword}) => {
            const response = await graphqlClient.request<{ forgetPassword: string }>(
                FORGET_PASSWORD,
                {email, newPassword}
            );
            console.log(response.forgetPassword);
            return response.forgetPassword;
        },
    });
}
