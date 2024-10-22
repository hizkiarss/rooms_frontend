import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TOTAL_TRANSACTIONS_BY_PROPERTY_ID } from "../graphQL/queries";

export const useTotalTransactionsByPropertyId = (
  propertyId: string,
  startDate: Date,
  endDate: Date
) => {
  const { data: session } = useSession();
  return useQuery<number | null>({
    queryKey: [
      "Total-Transactions",
      "Property",
      propertyId,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      try {
        const startDateISO = startDate.toISOString().split("T")[0];
        const endDateISO = endDate.toISOString().split("T")[0];
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        const response = await graphqlClient.request(
          TOTAL_TRANSACTIONS_BY_PROPERTY_ID,
          {
            propertyId: propertyId,
            startDate: startDateISO,
            endDate: endDateISO,
          }
        );

        if (!response || !response.totalTransactionsByPropertyId) {
          throw new Error("No total transaction data in the response");
        }
        return response.totalTransactionsByPropertyId;
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
    enabled: !!propertyId && !!startDate && !!endDate,
  });
};
