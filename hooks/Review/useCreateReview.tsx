"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";

import { CREATE_REVIEW, SAVE_PAYMENT_INITIAL } from "../graphQL/mutations";
import { PaymentInitial } from "@/types/payment/PaymentInitial";
import { ReviewRequest } from "@/types/review/ReviewInputType";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, ReviewRequest>({
    mutationFn: async (input: ReviewRequest) => {
      const { createReview } = await graphqlClient.request(CREATE_REVIEW, {
        input,
      });
      return createReview;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};
