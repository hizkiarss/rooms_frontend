import { TransactionsType } from "@/types/transactions/TransactionsType";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { LATEST_TRANSACTIONS_BY_PROPERTY_ID } from "../graphQL/queries";

export const useLatestTransactionsByPropertyId = (propertyId: string) => {
  return useQuery<TransactionsType[] | null>({
    queryKey: ["Latest-transactions", "Property", propertyId],
    queryFn: async () => {
      try {
        const response = await graphqlClient.request(
          LATEST_TRANSACTIONS_BY_PROPERTY_ID,
          { propertyId }
        );
        if (!response || !response.latestTransactionsByPropertyId) {
          throw new Error("No transaction data in the response");
        }
        return response.latestTransactionsByPropertyId;
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
