import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { DELETE_PROPERTIES } from '@/hooks/graphQL/mutations';
import {useSession} from "next-auth/react";

interface DeletePropertiesVariables {
    id: string;
}

export function useDeleteProperties() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, DeletePropertiesVariables>({
        mutationKey: ["deleteProperties"],
        mutationFn: async ({ id }) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });
            const response = await graphqlClient.request<{ deleteProperties: string }>(
                DELETE_PROPERTIES,
                { id }
            );
            return response.deleteProperties;
        },
        onSuccess: (data) => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ["properties", "property"] });
            console.log("Property deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to delete property:", error);
        },
    });
}