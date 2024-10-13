import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PROPERTY_PICTURES } from "@/hooks/graphQL/mutations";
import { PropertyPicturesType } from "@/types/property-pictures/PropertyPicturesType";
import {useSession} from "next-auth/react";

interface AddPropertyPicturesVariables {
    propertyId: string;
    imgUrl: string[];
}

export function useAddPropertyPictures() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<PropertyPicturesType[], Error, AddPropertyPicturesVariables>({
        mutationKey: ["propertyPictures"],
        mutationFn: async ({ propertyId, imgUrl }) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

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
