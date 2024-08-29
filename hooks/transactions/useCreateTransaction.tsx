"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";

import { CREATE_TRANSACTION } from "../graphQL/mutations";
import { TransactionRequest } from "@/types/transactions/CreateTransactionInput";

// export function useCreateTransaction() {
//   const queryClient = useQueryClient();

//   return useMutation<unknown, Error, CreateTransactionInput>({
//     mutationFn: async (input: CreateTransactionInput) => {
//       const { createTransaction } = await graphqlClient.request(
//         CREATE_TRANSACTION,
//         { input }
//       );
//       return createTransaction;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });
//     },
//   });
// }

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, TransactionRequest>({
    mutationFn: async (input: TransactionRequest) => {
      const { createTransaction } = await graphqlClient.request(
        CREATE_TRANSACTION,
        { input }
      );
      return createTransaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}