import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {ADD_PROPERTIES_FACILITIES} from "@/hooks/graphQL/mutations";
import {PropertyFacility} from "@/types/property-facility/PropertyFacilityType";

interface AddPropertiesFacilitiesVariables {
    id: string;
    facilitiesId: string[];
}

export function useAddPropertiesFacilities() {
    const queryClient = useQueryClient();

    return useMutation<PropertyFacility, Error, AddPropertiesFacilitiesVariables>({
        mutationKey: ["propertyFacilities"],
        mutationFn: async ({id, facilitiesId}) => {
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
