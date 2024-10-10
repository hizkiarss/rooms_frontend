import { useQuery } from "@tanstack/react-query";
import { ReceiptRussianRuble } from "lucide-react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_ROOM_PRICE } from "../graphQL/queries";

export const useRoomPrice = (
  slug: string,
  propertyId: string,
  checkInDate: Date
) => {
  return useQuery<number | null>({
    queryKey: ["price", slug, propertyId, checkInDate],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug is required");
      }
      if (!propertyId) {
        throw new Error("PropertyId is required");
      }
      if (!checkInDate) {
        throw new Error("CheckInDate is required");
      }
      try {
        const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
        const response = await graphqlClient.request(GET_ROOM_PRICE, {
          slug,
          propertyId,
          checkInDate: formattedCheckInDate,
        });

        if (!response || !response.roomPrice) {
          throw new Error("No Room price data in the response");
        }
        return response.roomPrice;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching room price:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
  });
};
