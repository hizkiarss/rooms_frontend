"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";

import { ACCEPT_PAYMENT_PROOF } from "../graphQL/mutations";

export const useAcceptPaymentProof = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<void, Error, { transactionId: string }>({
    mutationFn: async ({ transactionId }) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
      const { acceptPaymentProof } = await graphqlClient.request(
        ACCEPT_PAYMENT_PROOF,
        { transactionId }
      );
      return acceptPaymentProof;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-paymentproof"] });
    },
  });
};
