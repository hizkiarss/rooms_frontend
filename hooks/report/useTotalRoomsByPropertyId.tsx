"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TOTAL_ROOMS_BY_PROPERTY } from "../graphQL/queries";

export const useTotalRoomsByPropertyId = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<number | null>({
    queryKey: ["TotalRooms", "PropertyId", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(TOTAL_ROOMS_BY_PROPERTY, {
          propertyId,
        });
        if (!response || !response.totalRoom) {
          throw new Error("No Room data in the response");
        }
        return response.totalRoom;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching total room:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
