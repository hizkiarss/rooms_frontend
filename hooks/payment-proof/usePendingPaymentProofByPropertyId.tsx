"use client";
import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import {
  GET_PENDING_PAYMENT_PROOF,
  GET_PENDING_PAYMENT_PROOF_BY_PROPERTY_ID,
} from "../graphQL/queries";
import useSelectedProperty from "../useSelectedProperty";

const usePendingPaymentProofByPropertyId = () => {
  const { selectedProperty } = useSelectedProperty();
  const { data: session } = useSession();
  console.log("Selected property ID:", selectedProperty);

  return useQuery<PaymentProofType[]>({
    queryKey: ["pending-paymentproof", selectedProperty],
    queryFn: async () => {
      console.log("Fetching data for property ID:", selectedProperty);
      try {
        const token = session?.accessToken;
        graphqlClient.setHeaders({
          Authorization: `Bearer ${token}`,
        });
        const { pendingPaymentProofByPropertyId } = await graphqlClient.request(
          GET_PENDING_PAYMENT_PROOF_BY_PROPERTY_ID,
          { propertyId: selectedProperty }
        );
        console.log("Received data:", pendingPaymentProofByPropertyId);
        return pendingPaymentProofByPropertyId;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    enabled: !!selectedProperty,
  });
};

export default usePendingPaymentProofByPropertyId;
