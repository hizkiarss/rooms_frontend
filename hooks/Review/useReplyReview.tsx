"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ADD_PAYMENT_PROOF, REPLY_REVIEW } from "../graphQL/mutations";

export const useReplyReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    string,
    Error,
    { reviewId: string; reply: string; propertyId: string }
  >({
    mutationFn: async ({ reviewId, reply }) => {
      const { replyReview } = await graphqlClient.request(REPLY_REVIEW, {
        reviewId,
        reply,
      });
      return replyReview;
    },
    onSuccess: (_data, variables) => {
      const { propertyId } = variables;
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["Review", "property", propertyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["unreadReview", "property", propertyId],
        });
      }, 3000);
    },
  });
};
