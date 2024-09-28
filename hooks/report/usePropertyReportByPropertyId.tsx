"use client";

import { RoomType } from "@/types/rooms/RoomsType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REPORT_ROOMS_BY_PROPERTY } from "../graphQL/queries";

export const usePropertyReportByPropertyId = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<RoomType[] | null>({
    queryKey: ["Property-report-room", "Property", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(REPORT_ROOMS_BY_PROPERTY, {
          propertyId: propertyId,
        });
        if (!response || !response.getRoomsByPropertiesId) {
          throw new Error("No rooms data in the response");
        }
        return response.getRoomsByPropertiesId;
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
          console.error("Error fetching rooms:", error);
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
