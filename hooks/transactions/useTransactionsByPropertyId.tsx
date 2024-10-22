"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_TRANSACTIONS_BY_PROPERTY_ID } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";
import { useSession } from "next-auth/react";

export const useTransactionsByPropertyId = (startDate: Date, endDate: Date) => {
  const { selectedProperty } = useSelectedProperty();
  const { data: session } = useSession();

  return useQuery<TransactionsType[]>({
    queryKey: [
      "transactions",
      "property",
      selectedProperty,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        const startDateISO = startDate.toISOString().split("T")[0];
        const endDateISO = endDate.toISOString().split("T")[0];

        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        const response = await graphqlClient.request(
          GET_TRANSACTIONS_BY_PROPERTY_ID,
          {
            propertyId: selectedProperty,
            startDate: startDateISO,
            endDate: endDateISO,
          }
        );

        if (!response || !response.transactionsByPropertyId) {
          throw new Error("No transactions data in the response");
        }

        return response.transactionsByPropertyId;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!selectedProperty,
  });
};
