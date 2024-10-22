"use client";

import { useQuery } from "@tanstack/react-query";
import { REVIEW_BY_PROPERTY_ID } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { ReviewType } from "@/types/review/ReviewType";
import { PageResponse } from "@/types/responses/PageResponse";

export const useReviewByPropertyId = (
  propertyId: string,
  page: number,
  size: number,
  sortBy: string | null
) => {
  return useQuery<PageResponse<ReviewType[]>>({
    queryKey: ["Review", "property", propertyId, page, size, sortBy],
    queryFn: async () => {
      try {
        const variables = {
          propertyId,
          page,
          size,
          sortBy,
        };

        const response = await graphqlClient.request(
          REVIEW_BY_PROPERTY_ID,
          variables
        );

        if (!response || !response.reviewByPropertyId) {
          throw new Error("No review data in the response");
        }

        return response.reviewByPropertyId;
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
    enabled: !!propertyId,
  });
};
