import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PROPERTY_PICTURES } from "@/hooks/graphQL/mutations";
import { PropertyPicturesType } from "@/types/property-pictures/PropertyPicturesType";

interface AddPropertyPicturesVariables {
    propertyId: string;
    imgUrl: string[];
}

export function useAddPropertyPictures() {
    const queryClient = useQueryClient();

    return useMutation<PropertyPicturesType[], Error, AddPropertyPicturesVariables>({
        mutationKey: ["propertyPictures"],
        mutationFn: async ({ propertyId, imgUrl }) => {
            const response = await graphqlClient.request<{ addPropertyPictures: PropertyPicturesType[] }>(
                ADD_PROPERTY_PICTURES,
                { propertyId, imgUrl }
            );
            return response.addPropertyPictures;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["propertyPictures"] });
            console.log("Property pictures added successfully", data);
        },
        onError: (error) => {
            console.error("Failed to add property pictures:", error);
        },
    });
}
