"use client"

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_PROPERTIES_BY_SLUG} from "@/hooks/graphQL/queries";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail"; // Assuming you have a Property type
import {useQuery, useQueryClient} from "@tanstack/react-query";


export function useGetPropertyBySlug(slug: string) {
    return useQuery<PropertyDetailType, Error>({
        queryKey: ["property", slug],
        queryFn: async () => {
            const response = await graphqlClient.request<{ getPropertiesBySlug: PropertyDetailType }>(
                GET_PROPERTIES_BY_SLUG,
                { slug }
            );
            return response.getPropertiesBySlug;
        },
        meta:{
        onSuccess: (data: PropertyDetailType) => {
            console.log("Property details fetched successfully", data);
        },
        onError: (error: Error) => {
            console.error("Failed to fetch property details:", error);
        },
    }});
}
