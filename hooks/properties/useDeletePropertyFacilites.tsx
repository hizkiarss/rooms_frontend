import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { DELETE_PROPERTY_FACILITIES } from '@/hooks/graphQL/mutations';
import {useSession} from "next-auth/react"; // Import the mutation

interface DeletePropertyFacilitiesVariables {
    id: string;
    facilitiesId: string[];
}

export function useDeletePropertyFacilities() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, DeletePropertyFacilitiesVariables>({
        mutationKey: ["deletePropertyFacilities"],
        mutationFn: async ({ id, facilitiesId }) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ deletePropertyFacilities: string }>(
                DELETE_PROPERTY_FACILITIES,
                { id, facilitiesId }
            );
            return response.deletePropertyFacilities;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["property"] });
            console.log("Property facilities deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to delete property facilities:", error);
        },
    });
}