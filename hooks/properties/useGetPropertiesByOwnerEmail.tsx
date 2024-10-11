"use client"

import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_PROPERTIES_BY_OWNER_EMAIL} from "@/hooks/graphQL/queries";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail"; // Assuming you have a Property type
import {useQuery, useQueryClient} from "@tanstack/react-query";


export function useGetPropertiesByOwnerEmail(email: string) {
    return useQuery<PropertyDetailType[], Error>({
        queryKey: ["property", email],
        queryFn: async () => {
            const response = await graphqlClient.request<{ getPropertiesByOwnerEmail: PropertyDetailType[] }>(
                GET_PROPERTIES_BY_OWNER_EMAIL,
                { email }
            );
            return response.getPropertiesByOwnerEmail;
        },
        meta:{
            onSuccess: (data: PropertyDetailType[]) => {
                console.log("Property details fetched successfully", data);
            },
            onError: (error: Error) => {
                console.error("Failed to fetch property details:", error);
            },
        }});
}
