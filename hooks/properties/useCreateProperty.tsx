import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {CREATE_PROPERTIES} from "@/hooks/graphQL/mutations";
import {PropertyFacility} from "@/types/property-facility/PropertyFacilityType";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";

interface CreatePropertiesInput {
    email: string | null;
    propertyName: string | null;
    propertyCategories: string | null;
    description: string | null;
    checkInTime: string | null;
    checkOutTime: string | null;
    address: string | null;
    city: string | null;
    phoneNumber: string | null;
    star: number | null;
}

export function useCreateProperties() {
    const queryClient = useQueryClient();

    return useMutation<PropertyDetailType, Error, CreatePropertiesInput>({
        mutationKey: ["createProperties"],
        mutationFn: async (input) => {
            const response = await graphqlClient.request<{ createProperties: PropertyDetailType }>(
                CREATE_PROPERTIES,
                {input}
            );
            return response.createProperties;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["properties"]});
            console.log("Property created successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to create:", error);
        },
    });
}