import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { graphqlClient } from "../graphQL/graphqlClient";
import { GET_PENDING_PAYMENT_PROOF } from "../graphQL/queries";

const usePendingPaymentProof = () => {
  const { data: session } = useSession();
  return useQuery<PaymentProofType[]>({
    queryKey: ["pending-paymentproof"],
    queryFn: async () => {
      const token = session?.accessToken;
      graphqlClient.setHeaders({
        Authorization: `Bearer ${token}`,
      });
      const { pendingPaymentProof } = await graphqlClient.request(
        GET_PENDING_PAYMENT_PROOF
      );
      return pendingPaymentProof;
    },
  });
};

export default usePendingPaymentProof;
