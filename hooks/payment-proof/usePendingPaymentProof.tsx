import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_PENDING_PAYMENT_PROOF } from "../graphQL/queries";

const usePendingPaymentProof = () => {
  return useQuery<PaymentProofType[]>({
    queryKey: ["pending-paymentproof"],
    queryFn: async () => {
      const { pendingPaymentProof } = await graphqlClient.request(
        GET_PENDING_PAYMENT_PROOF
      );
      return pendingPaymentProof;
    },
  });
};

export default usePendingPaymentProof;
