import { BookingsType } from "@/types/bookings/BookingsType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { UPCOMING_BOOKINGS_BY_PROPERTY_ID } from "../graphQL/queries";

export const useUpcomingBookings = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<BookingsType[] | null>({
    queryKey: ["Upcoming-bookings", "Property", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(
          UPCOMING_BOOKINGS_BY_PROPERTY_ID,
          { propertyId }
        );
        if (!response || !response.upcomingBookings) {
          throw new Error("No transaction data in the response");
        }
        return response.upcomingBookings;
      } catch (error) {
        if (error instanceof Error) {
          // Handle known error instance
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            // Return null to indicate no data found
            return null;
          }
          console.error("Error fetching transactions:", error);
        } else {
          // Handle unknown error
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
