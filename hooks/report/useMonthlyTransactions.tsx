"use client";

import { MonthlyTransactionsType } from "@/types/transactions/MonthlyTransactionsType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { MONTHLY_TRANSACTIONS_BY_PROPERTY_ID } from "../graphQL/queries";

export const useMonthlyTransactions = (propertyId: string) => {
  const { data: session } = useSession();
  return useQuery<MonthlyTransactionsType[] | null>({
    queryKey: ["Monthly-transactions", "Property", propertyId],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(
          MONTHLY_TRANSACTIONS_BY_PROPERTY_ID,
          { propertyId }
        );
        if (!response || !response.monthlyTransactionsByPropertyId) {
          throw new Error("No transaction data in the response");
        }
        return response.monthlyTransactionsByPropertyId;
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
