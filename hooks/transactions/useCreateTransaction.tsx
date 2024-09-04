"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";

import { CREATE_TRANSACTION } from "../graphQL/mutations";
import { TransactionRequest } from "@/types/transactions/TransactionRequestType";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, TransactionRequest>({
    mutationFn: async (input: TransactionRequest) => {
      const { createTransaction } = await graphqlClient.request(
        CREATE_TRANSACTION,
        { input }
      );
      return createTransaction;
    },
    onSuccess: (_, input) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["transactions", "user", input.usersId],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions", "property", input.propertiesId],
      });
    },
  });
};
