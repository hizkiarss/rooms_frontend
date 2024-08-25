"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_TRANSACTIONS } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";

export function useTransactions() {
  return useQuery<TransactionsType[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { transactions } = await graphqlClient.request(GET_TRANSACTIONS);
      return transactions;
    },
  });
}
