import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaymentResponseType } from "@/types/payment/PaymentResponseType";

export const useVirtualAccountResponse = () => {
  const queryClient = useQueryClient();

  return useQuery<PaymentResponseType | null>({
    queryKey: ["virtualAccountResponse"],
    queryFn: () => {
      const cachedData = queryClient.getQueryData<PaymentResponseType>([
        "virtualAccountResponse",
      ]);
      return Promise.resolve(cachedData || null);
    },
    staleTime: Infinity,
  });
};
