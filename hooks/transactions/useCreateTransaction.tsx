"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { CREATE_TRANSACTION } from "../graphQL/mutations";
import { TransactionRequest } from "@/types/transactions/TransactionRequestType";
import { useSession } from "next-auth/react";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, TransactionRequest>({
    mutationFn: async (input: TransactionRequest) => {
      const token = session?.accessToken;

      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });

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
