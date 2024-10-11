"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";

import { SAVE_PAYMENT_INITIAL } from "../graphQL/mutations";
import { PaymentInitial } from "@/types/payment/PaymentInitial";
import { useSession } from "next-auth/react";

export const useSavePaymentIntial = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, PaymentInitial>({
    mutationFn: async (input: PaymentInitial) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
      const { saveTransaction } = await graphqlClient.request(
        SAVE_PAYMENT_INITIAL,
        { input }
      );
      return saveTransaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentInitial"] });
    },
  });
};
