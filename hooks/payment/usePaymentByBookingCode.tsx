"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_PAYMENT_BY_BOOKING_CODE } from "../graphQL/queries";
import { graphqlClient } from "../graphQL/graphqlClient";
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
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const response = await graphqlClient.request(
          GET_PAYMENT_BY_BOOKING_CODE,
          { bookingCode }
        );

        if (!response || !response.paymentByBookingCode) {
          return null;
        }

        return response.paymentByBookingCode;
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
