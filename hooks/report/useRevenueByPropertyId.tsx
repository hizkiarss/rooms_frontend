"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REVENUE_BY_PROPERTY } from "../graphQL/queries";

export const useRevenueByPropertyId = (
  propertyId: string,
  startDate: Date,
  endDate: Date
) => {
  const { data: session } = useSession();
  return useQuery<number | null>({
    queryKey: ["Revenue", "property", propertyId, startDate, endDate],
    queryFn: async () => {
      try {
        const startDateISO = startDate.toISOString().split("T")[0];
        const endDateISO = endDate.toISOString().split("T")[0];

        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(REVENUE_BY_PROPERTY, {
          propertyId: propertyId,
          startDate: startDateISO,
          endDate: endDateISO,
        });
        console.log("ini property", propertyId);
        console.log("ini startDate", startDate);
        console.log("ini endDate", endDate);
        if (!response || !response.revenueByProperty) {
          throw new Error("No Revenue data in the response");
        }
        return response.revenueByProperty;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching revenue:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!propertyId && !!startDate && !!endDate,
  });
};
