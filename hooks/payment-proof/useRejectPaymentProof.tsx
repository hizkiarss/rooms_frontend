"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REJECT_PAYMENT_PROOF } from "../graphQL/mutations";

export const useRejectPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { transactionId: string }>({
    mutationFn: async ({ transactionId }) => {
      const { acceptPaymentProof } = await graphqlClient.request(
        REJECT_PAYMENT_PROOF,
        { transactionId }
      );
      return acceptPaymentProof;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-paymentproof"] });
    },
  });
};
