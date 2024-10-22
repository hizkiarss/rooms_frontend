"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { CURRENTLY_OCCUPIED_ROOM_BY_PROPERTY_ID } from "../graphQL/queries";

export const useCurrentlyOccupiedRooms = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<number | null>({
    queryKey: ["Occupied-rooms", "PropertyId", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(
          CURRENTLY_OCCUPIED_ROOM_BY_PROPERTY_ID,
          { propertyId }
        );
        if (!response || !response.occupiedRooms) {
          throw new Error("No occupied room data in the response");
        }
        return response.occupiedRooms;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
        } else {
        }
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
