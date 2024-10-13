import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {ADD_PROPERTIES_FACILITIES} from "@/hooks/graphQL/mutations";
import {PropertyFacility} from "@/types/property-facility/PropertyFacilityType";
import {useSession} from "next-auth/react";

interface AddPropertiesFacilitiesVariables {
    id: string;
    facilitiesId: string[];
}

export function useAddPropertiesFacilities() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<PropertyFacility, Error, AddPropertiesFacilitiesVariables>({
        mutationKey: ["propertyFacilities"],
        mutationFn: async ({id, facilitiesId}) => {

            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });
            const response = await graphqlClient.request<{ addPropertyFacilities: PropertyFacility }>(
                ADD_PROPERTIES_FACILITIES,
                {id, facilitiesId}
            );
            return response.addPropertyFacilities;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["propertyFacilities", "property"]});
            console.log("Property facilities updated successfully");
        },
        onError: (error) => {
            console.error("Failed to update property facilities:", error);
        },
    });
}
