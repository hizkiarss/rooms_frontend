"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
  GET_TRANSACTIONS_BY_USER_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";
import { useSession } from "next-auth/react";
import { useFindUserbyEmail } from "../user/useFindUserbyEmail";
import { PageResponse } from "@/types/responses/PageResponse";

// export const useTransactionsByUsersId = () => {
//   const { data: session } = useSession();
//   const { data: user } = useFindUserbyEmail(session?.user.email);
//   const usersId = user?.id;

//   return useQuery<TransactionsType[] | null>({
//     queryKey: ["transactions", "user", usersId],
//     queryFn: async () => {
//       try {
//         console.log("Fetching transactions for usersId:", usersId);
//         const token = session?.accessToken;
//         graphqlClient.setHeaders({
//           Authorization: `Bearer ${token}`,
//         });
//         const response = await graphqlClient.request(
//           GET_TRANSACTIONS_BY_USER_ID
//         );
//         console.log("GraphQL response:", response);

//         if (!response || !response.transactionsByUsersId) {
//           throw new Error("No transactions data in the response");
//         }

//         return response.transactionsByUsersId;
//       } catch (error) {
//         if (error instanceof Error) {
//           if (
//             (error as any).response?.errors?.[0]?.extensions?.classification ===
//             "NOT_FOUND"
//           ) {
//             return null;
//           }
//           console.error("Error fetching transaction:", error);
//         } else {
//           console.error("Unexpected error:", error);
//         }
//         throw error;
//       }
//     },
//     enabled: !!usersId,
//   });
// };

// export const useTransactionsByUsersId = (page: number, size: number) => {
//   const { data: session } = useSession();
//   const { data: user } = useFindUserbyEmail(session?.user.email);
//   const usersId = user?.id;

//   return useQuery<PageResponse<TransactionsType>>({
//     queryKey: ["transactions", "user", usersId, page, size],
//     queryFn: async () => {
//       try {
//         const token = session?.accessToken;
//         graphqlClient.setHeaders({
//           Authorization: `Bearer ${token}`,
//         });
//         const response = await graphqlClient.request(
//           GET_TRANSACTIONS_BY_USER_ID,
//           { page, size }
//         );

//         if (!response || !response.transactionsByUsersId) {
//           throw new Error("No transactions data in the response");
//         }

//         return response.transactionsByUsersId;
//       } catch (error) {
//         if (error instanceof Error) {
//           if (
//             (error as any).response?.errors?.[0]?.extensions?.classification ===
//             "NOT_FOUND"
//           ) {
//             return null;
//           }
//           console.error("Error fetching transaction:", error);
//         } else {
//           console.error("Unexpected error:", error);
//         }
//         throw error;
//       }
//     },
//     enabled: !!usersId,
//   });
// };

export const useTransactionsByUsersId = (
  page: number,
  size: number,
  sort: string | null, /// Ini akan digunakan sebagai 'sort' di query
  status: string // Ini akan digunakan sebagai 'status' di query
) => {
  const { data: session } = useSession();
  const { data: user } = useFindUserbyEmail(session?.user.email);
  const usersId = user?.id;

  return useQuery<PageResponse<TransactionsType>>({
    queryKey: ["transactions", "user", usersId, page, size, sort, status],
    queryFn: async () => {
      try {
        const token = session?.accessToken;
        console.log("ini tokennya ", token);
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        // Menyesuaikan nama variabel agar cocok dengan query
        const variables = {
          page,
          size,
          sort, // Mengubah dari sortBy menjadi sort
          status, // Mengubah dari statusFilter menjadi status
        };

        const response = await graphqlClient.request(
          GET_TRANSACTIONS_BY_USER_ID,
          variables
        );

        if (!response || !response.transactionsByUsersId) {
          throw new Error("No transactions data in the response");
        }

        return response.transactionsByUsersId;
      } catch (error) {
        if (error instanceof Error) {
          if (
            (error as any).response?.errors?.[0]?.extensions?.classification ===
            "NOT_FOUND"
          ) {
            return null;
          }
          console.error("Error fetching transaction:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
    enabled: !!usersId,
  });
};
