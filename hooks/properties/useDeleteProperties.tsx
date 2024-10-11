import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { DELETE_PROPERTIES } from '@/hooks/graphQL/mutations';

interface DeletePropertiesVariables {
    id: string;
}

export function useDeleteProperties() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, DeletePropertiesVariables>({
        mutationKey: ["deleteProperties"],
        mutationFn: async ({ id }) => {
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