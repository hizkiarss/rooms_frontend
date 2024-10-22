"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { REPLY_REVIEW } from "../graphQL/mutations";

export const useReplyReview = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation<
    string,
    Error,
    { reviewId: string; reply: string; propertyId: string }
  >({
    mutationFn: async ({ reviewId, reply }) => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });

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
