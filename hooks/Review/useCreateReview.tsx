"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { CREATE_REVIEW } from "../graphQL/mutations";
import { ReviewRequest } from "@/types/review/ReviewInputType";
import { useSession } from "next-auth/react";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, ReviewRequest>({
    mutationFn: async (input: ReviewRequest) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });

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
