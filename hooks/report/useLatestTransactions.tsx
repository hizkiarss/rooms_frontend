import { TransactionsType } from "@/types/transactions/TransactionsType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { LATEST_TRANSACTIONS_BY_PROPERTY_ID } from "../graphQL/queries";

export const useLatestTransactionsByPropertyId = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<TransactionsType[] | null>({
    queryKey: ["Latest-transactions", "Property", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
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
