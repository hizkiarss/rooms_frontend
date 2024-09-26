import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_FILTERED_PROPERTIES } from "@/hooks/graphQL/queries";
import { PagedPropertyResult } from "@/types/properties/PagedPropertyResult";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface GetFilteredPropertiesVariables {
    city: string;
    page: number;
    category: string;
    rating?: number | null;
    startPrice?: number | null;
    endPrice?: number | null;
}

export function useGetFilteredProperties(variables: GetFilteredPropertiesVariables) {
    const queryClient = useQueryClient();

    return useQuery<PagedPropertyResult, Error>({
        queryKey: ["properties", variables],
        queryFn: async () => {
            const response = await graphqlClient.request<{ getFilteredProperties: PagedPropertyResult }>(
                GET_FILTERED_PROPERTIES,
                variables
            );
            return response.getFilteredProperties;
        },
        onSuccess: (data: PagedPropertyResult) => {  // Ensure the type here matches the return type
            queryClient.invalidateQueries({queryKey: ["propertyFacilities"]});
            console.log("Filtered properties fetched successfully", data);
        },
        onError: (error: Error) => {
            console.error("Failed to fetch filtered properties:", error);
        },
    });
}
