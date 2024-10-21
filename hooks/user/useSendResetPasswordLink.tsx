import {useMutation} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {SEND_RESET_PASSWORD_LINK} from "@/hooks/graphQL/mutations";
import {UserType} from "@/types/users/Usertype";
import {useQueryClient} from "@tanstack/react-query";


interface SendResetPasswordLinkVariables {
    email: string;
}

export function useSendResetPasswordLink() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, SendResetPasswordLinkVariables>({
        mutationFn: async ({email}) => {
            const response = await graphqlClient.request<{ sendResetPasswordLink: string }>(
                SEND_RESET_PASSWORD_LINK,
                {email}
            );
            console.log(response.sendResetPasswordLink);
            return response.sendResetPasswordLink;
        }

    })
}