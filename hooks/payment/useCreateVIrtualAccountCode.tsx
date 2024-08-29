"use client";
import { CreateVirtualAccountCodeInputType } from "@/types/payment/CreateVirtualAccountType";
import { PaymentResponseType } from "@/types/payment/PaymentResponseType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { CREATE_VIRTUAL_ACCOUNT_CODE } from "../graphQL/mutations";

export const useCreateVirtualAccountCode = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PaymentResponseType,
    Error,
    CreateVirtualAccountCodeInputType
  >({
    mutationFn: async (input: CreateVirtualAccountCodeInputType) => {
      const { createVirtualAccountCode } = await graphqlClient.request(
        CREATE_VIRTUAL_ACCOUNT_CODE,
        input
      );
      return createVirtualAccountCode;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["virtualAccountCodes"] });
    },
  });
};
