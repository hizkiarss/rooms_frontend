"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_TRANSACTIONS_BY_USER_ID } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import { useSession } from "next-auth/react";
import { useFindUserbyEmail } from "../user/useFindUserbyEmail";
import { PageResponse } from "@/types/responses/PageResponse";

export const useTransactionsByUsersId = (
  page: number,
  size: number,
  sort: string | null,
  status: string | null
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

        const variables = {
          page,
          size,
          sort,
          status,
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
        } else {
        }
        throw error;
      }
    },
    enabled: !!usersId,
  });
};
