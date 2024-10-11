"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
  GET_UNREAD_REVIEW_BY_PROPERTY_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
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
        console.log("Fetching unread review for propertyId:", selectedProperty);
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
        console.log("GraphQL response:", response);

        if (!response || !response.unReadReviewByPropertyId) {
          throw new Error("No review data in the response");
        }

        return response.unReadReviewByPropertyId;
      } catch (error) {
        if (error instanceof Error) {
          // Handle known error instance
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            // Return null to indicate no data found
            return null;
          }
          console.error("Error fetching transactions:", error);
        } else {
          // Handle unknown error
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!selectedProperty,
  });
};
