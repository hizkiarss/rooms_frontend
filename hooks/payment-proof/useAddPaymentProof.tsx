"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PAYMENT_PROOF } from "../graphQL/mutations";

export const useAddPaymentProof = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, { transactionId: string; imgUrl: string }>({
    mutationFn: async ({ transactionId, imgUrl }) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
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
