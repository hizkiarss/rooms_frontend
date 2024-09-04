"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
  GET_TRANSACTIONS_BY_USER_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";

export const useTransactionsByUsersId = () => {
  const usersId = "1";

  return useQuery<TransactionsType[]>({
    queryKey: ["transactions", "user", usersId],
    queryFn: async () => {
      try {
        console.log("Fetching transactions for propertyId:", usersId);
        const response = await graphqlClient.request(
          GET_TRANSACTIONS_BY_USER_ID,
          {
            usersId: usersId,
          }
        );
        console.log("GraphQL response:", response);

        if (!response || !response.transactionsByUsersId) {
          throw new Error("No transactions data in the response");
        }

        return response.transactionsByUsersId;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }
    },
    enabled: !!usersId,
  });
};
