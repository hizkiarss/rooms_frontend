"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
  GET_UNREAD_REVIEW_BY_PROPERTY_ID,
  REVIEW_BY_PROPERTY_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";
import { ReviewType } from "@/types/review/ReviewType";

import { PageResponse } from "@/types/responses/PageResponse";

// export const useReviewByPropertyId = (propertyId: string) => {
//   return useQuery<ReviewType[]>({
//     queryKey: ["Review", "property", propertyId],
//     queryFn: async () => {
//       try {
//         console.log("Fetching unread review for propertyId:", propertyId);
//         const response = await graphqlClient.request(REVIEW_BY_PROPERTY_ID, {
//           propertyId: propertyId,
//         });
//         console.log("GraphQL response:", response);

//         if (!response || !response.reviewByPropertyId) {
//           throw new Error("No review data in the response");
//         }

//         return response.reviewByPropertyId;
//       } catch (error) {
//         if (error instanceof Error) {
//           // Handle known error instance
//           if (
//             (error as any).response?.errors?.[0]?.extensions?.classification ===
//             "NOT_FOUND"
//           ) {
//             // Return null to indicate no data found
//             return null;
//           }
//           console.error("Error fetching review:", error);
//         } else {
//           // Handle unknown error
//           console.error("Unexpected error:", error);
//         }
//         throw error;
//       }
//     },
//     enabled: !!propertyId,
//   });
// };

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
        console.log("Fetching unread review for propertyId:", propertyId);
        const variables = {
          propertyId,
          page,
          size,
          sortBy, // Mengubah dari sortBy menjadi sort
        };
        const response = await graphqlClient.request(
          REVIEW_BY_PROPERTY_ID,
          variables
        );
        console.log("GraphQL response:", response);

        if (!response || !response.reviewByPropertyId) {
          throw new Error("No review data in the response");
        }

        return response.reviewByPropertyId;
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
          console.error("Error fetching review:", error);
        } else {
          // Handle unknown error
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!propertyId,
  });
};
