import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { DELETE_PROPERTY_FACILITIES } from '@/hooks/graphQL/mutations'; // Import the mutation

interface DeletePropertyFacilitiesVariables {
    id: string;
    facilitiesId: string[];
}

export function useDeletePropertyFacilities() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, DeletePropertyFacilitiesVariables>({
        mutationKey: ["deletePropertyFacilities"],
        mutationFn: async ({ id, facilitiesId }) => {
            const response = await graphqlClient.request<{ deletePropertyFacilities: string }>(
                DELETE_PROPERTY_FACILITIES,
                { id, facilitiesId }
            );
            return response.deletePropertyFacilities;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["propertyFacilities", "property"] });
            console.log("Property facilities deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to delete property facilities:", error);
        },
    });
}