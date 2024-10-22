"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_UNREAD_REVIEW_BY_PROPERTY_ID } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import useSelectedProperty from "../useSelectedProperty";
import { ReviewType } from "@/types/review/ReviewType";
import { useSession } from "next-auth/react";

export const useUnReadReviewByPropertyId = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: session } = useSession();

  return useQuery<ReviewType[]>({
    queryKey: ["unreadReview", "property", selectedProperty],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        const response = await graphqlClient.request(
          GET_UNREAD_REVIEW_BY_PROPERTY_ID,
          {
            propertyId: selectedProperty,
          }
        );

        if (!response || !response.unReadReviewByPropertyId) {
          throw new Error("No review data in the response");
        }

        return response.unReadReviewByPropertyId;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
        } else {
        }
        throw error;
      }
    },
    enabled: !!selectedProperty,
  });
};
