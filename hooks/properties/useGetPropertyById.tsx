"use client"

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_PROPERTIES_BY_ID} from "@/hooks/graphQL/queries";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail"; // Assuming you have a Property type
import {useQuery, useQueryClient} from "@tanstack/react-query";


export function useGetPropertyById(id: string) {
    return useQuery<PropertyDetailType, Error>({
        queryKey: ["property", id],
        queryFn: async () => {
            const response = await graphqlClient.request<{ getPropertiesById: PropertyDetailType }>(
                GET_PROPERTIES_BY_ID,
                { id }
            );
            return response.getPropertiesById;
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
