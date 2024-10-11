import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import {FIND_USER_BY_EMAIL} from "@/hooks/graphQL/queries";
import {UserType} from "@/types/users/Usertype";

export function useFindUserbyEmail(email: string) {
    return useQuery<UserType, Error>({
        queryKey: ["findUserByEmail",email], // Correct way to define query key
        queryFn: async () => {
            try {
                const response = await graphqlClient.request<{ findUserByEmail: UserType }>(
                    FIND_USER_BY_EMAIL,
                    { email }
                );
                console.log("GraphQL Response:", response); // Add this line
                return response.findUserByEmail;
            } catch (error) {
                console.error("Error fetching city data:", error);
                throw error;
            }
        },
        enabled: !!email, // Only fetch if name is not empty or null
    });
}
