"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import BankOptionsCard from "./component/BankOptionsCard";
import RoomDetailCard from "../component/RoomDetailCard";
import PriceDetailsCard from "../component/PriceDetailsCard";
import Buttons from "@/components/Buttons";
import ManualTransfer from "./component/ManualTransfer";
import PaymentInstructions from "./component/PaymentInstructions";
import { useTransactionsByBookingCode } from "@/hooks/transactions/useTransactionsByBookingCode";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import VirtualAccountForm from "./component/VirtualAccountForm";
const page = () => {
  const { payment } = useParams();
  const router = useRouter();

  // if (payment !== "bank" && payment !== "manual") {
  //   router.push("/");
  //   return null;
  // }
  const {
    data: transaction,
    isLoading,
    error,
  } = useTransactionsByBookingCode();

  // Tampilkan pesan loading saat data sedang diambil
  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  // Tampilkan pesan error jika ada error
  if (error) {
    return <div>Error loading transactions: {(error as Error).message}</div>;
  }
  console.log("ini transaksinya", transaction);
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px] ">
      {transaction ? (
        <div className="flex flex-col md:flex-row gap-3 ">
          <div className="md:w-7/12 lg:w-8/12 w-full space-y-4">
            {transaction.paymentMethod === PaymentMethodType.BANK_TRANSFER && (
              <BankOptionsCard />
            )}
            {transaction.paymentMethod ===
              PaymentMethodType.MANUAL_TRANSFER && <ManualTransfer />}
            <RoomDetailCard />
            <VirtualAccountForm />
          </div>
          <div className="md:w-5/12 lg:w-4/12 w-full ">
            <div className="sticky top-4">
              <PriceDetailsCard />
              <Buttons
                value={"Book now"}
                type={"submit"}
                className={"w-full my-5"}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default page;
