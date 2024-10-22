"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_TRANSACTIONS_BY_BOOKING_CODE } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import { useSession } from "next-auth/react";
import { TransactionDetailType } from "@/types/transactions/TransactionDetailType";

export const useTransactionsByBookingCode = (bookingCode: string) => {
  const { data: session } = useSession();
  return useQuery<TransactionsType>({
    queryKey: ["transactions", "bookingCode", bookingCode],
    queryFn: async () => {
      if (!bookingCode) {
        throw new Error("Booking code is required");
      }

      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });

        const response = await graphqlClient.request(
          GET_TRANSACTIONS_BY_BOOKING_CODE,
          { bookingCode }
        );

        if (!response || !response.transactionsByBookingCode) {
          throw new Error("No transactions data in the response");
        }

        response.transactionsByBookingCode.transactionDetails =
          response.transactionsByBookingCode.transactionDetails.map(
            (detail: TransactionDetailType) => ({
              ...detail,
              price: detail.price ? Math.round(detail.price) : 0,
            })
          );

        return response.transactionsByBookingCode;
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
    enabled: !!bookingCode,
  });
};
