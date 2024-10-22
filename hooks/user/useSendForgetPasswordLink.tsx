import {useMutation} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {SEND_FORGET_PASSWORD_LINK} from "@/hooks/graphQL/mutations";
import {useQueryClient} from "@tanstack/react-query";

interface SendForgetPasswordLinkVariables {
    email: string;
}

export function useSendForgetPasswordLink() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, SendForgetPasswordLinkVariables>({
        mutationFn: async ({email}) => {
            const response = await graphqlClient.request<{ sendForgetPasswordLink: string }>(
                SEND_FORGET_PASSWORD_LINK,
                {email}
            );
            console.log(response.sendForgetPasswordLink);
            return response.sendForgetPasswordLink;
        },
    });
}
