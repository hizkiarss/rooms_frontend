import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { FIND_CITY_BY_NAME } from "@/hooks/graphQL/queries";
import { City } from "@/types/city/City";

export function useFindCityByName(name: string) {
    return useQuery<City[], Error>({
        queryKey: ["findCityByName", name], // Correct way to define query key
        queryFn: async () => {
            console.log("name",name)
            if (!name) return []; // Return empty array if name is falsy
            try {
                const response = await graphqlClient.request<{ findCityByName: City[] }>(
                    FIND_CITY_BY_NAME,
                    { name }
                );
                console.log("GraphQL Response:", response); // Add this line
                return response.findCityByName;
            } catch (error) {
                console.error("Error fetching city data:", error);
                throw error;
            }
        },
        enabled: !!name, // Only fetch if name is not empty or null
    });
}
