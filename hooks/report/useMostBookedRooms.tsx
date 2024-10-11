import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { MOST_BOOKED_ROOMS } from "../graphQL/queries";

export const useMostBookedRooms = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<string[] | null>({
    queryKey: ["most-booking", "Property", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(MOST_BOOKED_ROOMS, {
          propertyId,
        });
        if (!response || !response.mostBookedRoomNames) {
          throw new Error("No room name data in the response");
        }
        return response.mostBookedRoomNames;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching transactions:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
