"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { SET_READ_REVIEW } from "../graphQL/mutations";

export const useSetReadReview = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<string, Error, { reviewId: string }>({
    mutationFn: async ({ reviewId }) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });

      const { setReadReview } = await graphqlClient.request(SET_READ_REVIEW, {
        reviewId,
      });

      return setReadReview;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
  });
};
