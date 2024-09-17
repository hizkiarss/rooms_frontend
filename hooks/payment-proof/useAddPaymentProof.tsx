"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PAYMENT_PROOF } from "../graphQL/mutations";

export const useAddPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { transactionId: string; imgUrl: string }>({
    mutationFn: async ({ transactionId, imgUrl }) => {
      const { addPaymentProof } = await graphqlClient.request(
        ADD_PAYMENT_PROOF,
        { transactionId, imgUrl }
      );
      return addPaymentProof;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ["pending-paymentproof"] });
      // queryClient.invalidateQueries({
      //   queryKey: ["transactions", "user", userId],
      // });
      // console.log("ini useridnya", userId);
    },
  });
};
