import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {UPDATE_PROPERTIES} from "@/hooks/graphQL/mutations";

interface UpdatePropertiesVariables {
    propertyName: string;
    propertyCategories: string;
    description: string;
    checkInTime: string;
    checkOutTime: string;
    address: string;
    city: string;
    phoneNumber: string;
    star: number;
}

export function useUpdateProperties(id: string) {
    const queryClient = useQueryClient();

    return useMutation<string, Error, UpdatePropertiesVariables>({
        mutationKey: ["properties", "update", id],
        mutationFn: async (input) => {
            if (!id) {
                throw new Error("Property ID is required");
            }
            const response = await graphqlClient.request<{ updateProperties: string }>(
                UPDATE_PROPERTIES,
                {id, input}
            );
            return response.updateProperties;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["properties"]});
            console.log("Property updated successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to update property:", error);
        },
    });
}
