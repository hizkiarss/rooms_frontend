import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_FILTERED_PROPERTIES } from "@/hooks/graphQL/queries";
import { PagedPropertyResult } from "@/types/properties/PagedPropertyResult";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface GetFilteredPropertiesVariables {
    city: string;
    page: number;
    category: string;
    rating?: number | null;
    startPrice?: number | null;
    endPrice?: number | null;
    isBreakfast?: boolean | null;
    sortBy?: string | null;
    checkInDate: string;
    checkOutDate: string;
}

export function useGetFilteredProperties(variables: GetFilteredPropertiesVariables) {
    const queryClient = useQueryClient();

    const formattedVariables = {
        ...variables,
        checkInDate: dayjs(variables.checkInDate)
            .tz("Asia/Jakarta")
            .format("YYYY-MM-DD"),
        checkOutDate: dayjs(variables.checkOutDate)
            .tz("Asia/Jakarta")
            .format("YYYY-MM-DD"),
    };

    return useQuery<PagedPropertyResult, Error>({
        queryKey: ["properties", formattedVariables],
        queryFn: async () => {
            const response = await graphqlClient.request<{ getFilteredProperties: PagedPropertyResult }>(
                GET_FILTERED_PROPERTIES,
                formattedVariables // Use formatted variables
            );
            console.log(formattedVariables, "Variables sent to GraphQL");
            return response.getFilteredProperties;
        },

        meta: {
            onSuccess: (data: PagedPropertyResult) => {  // Ensure the type here matches the return type
                queryClient.invalidateQueries({ queryKey: ["propertyFacilities"] });
                console.log("Filtered properties fetched successfully", data);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch filtered properties:", error);
            },
        }
    });
}
