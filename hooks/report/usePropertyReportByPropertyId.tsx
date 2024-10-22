"use client";

import { RoomType } from "@/types/rooms/RoomsType";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REPORT_ROOMS_BY_PROPERTY } from "../graphQL/queries";

export const usePropertyReportByPropertyId = (propertyId: string) => {
  return useQuery<RoomType[] | null>({
    queryKey: ["Property-report-room", "Property", propertyId],
    queryFn: async () => {
      try {
        const response = await graphqlClient.request(REPORT_ROOMS_BY_PROPERTY, {
          propertyId: propertyId,
        });
        if (!response || !response.getRoomsByPropertiesId) {
          throw new Error("No rooms data in the response");
        }
        return response.getRoomsByPropertiesId;
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
