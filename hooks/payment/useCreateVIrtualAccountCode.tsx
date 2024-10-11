"use client";
import { CreateVirtualAccountCodeInputType } from "@/types/payment/CreateVirtualAccountType";
import { PaymentResponseType } from "@/types/payment/PaymentResponseType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { CREATE_VIRTUAL_ACCOUNT_CODE } from "../graphQL/mutations";

export const useCreateVirtualAccountCode = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<
    PaymentResponseType,
    Error,
    CreateVirtualAccountCodeInputType
  >({
    mutationFn: async (input: CreateVirtualAccountCodeInputType) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
      const { createVirtualAccountCode } = await graphqlClient.request(
        CREATE_VIRTUAL_ACCOUNT_CODE,
        input
      );
      return createVirtualAccountCode;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["virtualAccountResponse"], data);
      queryClient.invalidateQueries({ queryKey: ["virtualAccountCodes"] });
    },
  });
};
