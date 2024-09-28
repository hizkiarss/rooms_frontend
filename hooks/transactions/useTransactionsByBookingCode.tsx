"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_BOOKING_CODE,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export const useTransactionsByBookingCode = (bookingCode: string) => {
  const { data: session } = useSession();
  return useQuery<TransactionsType>({
    queryKey: ["transactions", "bookingCode", bookingCode],
    queryFn: async () => {
      if (!bookingCode) {
        throw new Error("Booking code is required");
      }

      try {
        console.log("Fetching transactions for booking code:", bookingCode);
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

        return response.transactionsByBookingCode;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }
    },
    enabled: !!bookingCode,
  });
};
