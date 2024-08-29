"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";

import { ACCEPT_PAYMENT_PROOF } from "../graphQL/mutations";

export const useAcceptPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { transactionId: string }>({
    mutationFn: async ({ transactionId }) => {
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
