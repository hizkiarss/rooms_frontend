"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PAYMENT_PROOF, CANCEL_TRANSACTION } from "../graphQL/mutations";

export const useCancelTransaction = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, { bookingCode: string }>({
    mutationFn: async ({ bookingCode }) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
      const { cancelTransaction } = await graphqlClient.request(
        CANCEL_TRANSACTION,
        { bookingCode }
      );
      return cancelTransaction;
    },
    onSuccess: (_, bookingCode) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["transactions", "bookingCode", bookingCode],
      });
    },
  });
};
