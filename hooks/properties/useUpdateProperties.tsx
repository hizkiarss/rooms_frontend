import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {UPDATE_PROPERTIES} from "@/hooks/graphQL/mutations";
import {session} from "@auth/core/lib/actions";
import {useSession} from "next-auth/react";

interface UpdatePropertiesVariables {
    propertyName: string;
    propertyCategories: string;
    description: string;
    checkInTime: string;
    checkOutTime: string;
    address: string;
    city: string;
    phoneNumber: string;
    star: number;
}

export function useUpdateProperties(id: string) {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, UpdatePropertiesVariables>({
        mutationKey: ["properties", "update", id],
        mutationFn: async (input) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            if (!id) {
                throw new Error("Property ID is required");
            }
            const response = await graphqlClient.request<{ updateProperties: string }>(
                UPDATE_PROPERTIES,
                {id, input}
            );
            return response.updateProperties;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["properties"]});
            console.log("Property updated successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to update property:", error);
        },
    });
}
