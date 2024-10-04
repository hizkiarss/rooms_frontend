"use client";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import { usePaymentByBookingCode } from "@/hooks/payment/usePaymentByBookingCode";
import { Dot } from "lucide-react";

const VirtualAccountDetails: React.FC = () => {
  const { data: payment, isLoading, error } = usePaymentByBookingCode();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  if (!payment) {
    return <NoDataFoundAnimation />;
  }

  let bank: string = payment.bank;
  bank = bank.toUpperCase();

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div className="flex">
          <Dot />
          <div>{bank} Virtual Account</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex">
          <Dot />
          <div>Virtual Account Number : </div>
        </div>
        <div>{payment?.vaNumber}</div>
      </div>
    </>
  );
};
export default VirtualAccountDetails;
