"use client";

import { useQuery } from "@tanstack/react-query";
import {
  GET_PAYMENT_BY_BOOKING_CODE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_BOOKING_CODE,
  GET_TRANSACTIONS_BY_PROPERTY_ID,
} from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
import { TransactionsType } from "@/types/transactions/TransactionsType";
import useSelectedProperty from "../useSelectedProperty";
import { useParams } from "next/navigation";
import { PaymentType } from "@/types/payment/PaymentType";
import { useSession } from "next-auth/react";

export const usePaymentByBookingCode = () => {
  const { bookingCode: bookingCode } = useParams<{ bookingCode: string }>();
  const { data: session } = useSession();

  return useQuery<PaymentType>({
    queryKey: ["paymentByBookingCode", bookingCode],
    queryFn: async () => {
      if (!bookingCode) {
        throw new Error("Booking code is required");
      }

      try {
        console.log("Fetching payment for booking code:", bookingCode);
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(
          GET_PAYMENT_BY_BOOKING_CODE,
          { bookingCode }
        );
        //console.log("GraphQL response:", response);

        if (!response || !response.paymentByBookingCode) {
          // Return null to indicate no data found instead of throwing an error
          return null;
        }

        return response.paymentByBookingCode;
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
    enabled: !!bookingCode,
  });
};
