"use client";

import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { useQueries, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_CHECK_PAYMENT_PROOF_BY_PROPERTY_ID } from "../graphQL/queries";
import useSelectedProperty from "../useSelectedProperty";

const useCheckPaymentProofByPropertyId = () => {
  const { selectedProperty } = useSelectedProperty();
  return useQuery<PaymentProofType[]>({
    queryKey: ["check-paymentproof", selectedProperty],
    queryFn: async () => {
      try {
        const { checkPaymentProofByPropertyId } = await graphqlClient.request(
          GET_CHECK_PAYMENT_PROOF_BY_PROPERTY_ID,
          { propertyId: selectedProperty }
        );
        return checkPaymentProofByPropertyId;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    enabled: !!selectedProperty,
  });
};

export default useCheckPaymentProofByPropertyId;
