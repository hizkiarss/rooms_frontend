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
import CekResponse from "./component/CekResponse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateVirtualAccountCode } from "@/hooks/payment/useCreateVIrtualAccountCode";
import { useSavePaymentIntial } from "@/hooks/payment/useSavePaymentInitial";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

const validationSchema = Yup.object({
  bank: Yup.string().required("Bank is required"),
});

const page = () => {
  const router = useRouter();

  const {
    data: transaction,
    isLoading,
    error,
  } = useTransactionsByBookingCode();
  const createVirtualAccountCode = useCreateVirtualAccountCode();
  const savePaymentInitial = useSavePaymentIntial();

  const formik = useFormik({
    initialValues: {
      bookingCode: transaction?.bookingCode ?? "",
      bank: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createVirtualAccountCode.mutate(
        {
          bookingCode: transaction?.bookingCode ?? "",
          bank: values.bank,
        },
        {
          onSuccess: (data) => {
            console.log("Virtual Account Code created:", data);
            //alert("Virtual Account Code created successfully!");

            const paymentInitialData = {
              bookingCode: transaction?.bookingCode ?? "",
              bank: values.bank,
              vaNumber: data.va_numbers[0].va_number,
            };
            savePaymentInitial.mutate(paymentInitialData, {
              onSuccess: () => {
                console.log("Payment initial saved successfully!");
                //alert("Payment details saved successfully!");
                setSubmitting(false);
                router.push(`/finish-payment/${transaction?.bookingCode}`);
              },
              onError: (error) => {
                console.error("Error saving payment initial:", error);
                alert(`Error saving payment details: ${error.message}`);
                setSubmitting(false);
              },
            });
          },
          onError: (error) => {
            console.error("Error creating Virtual Account Code:", error);
            alert(`Error: ${error.message}`);
            setSubmitting(false);
          },
        }
      );
    },
  });

  const handleMyOrder = () => {
    router.push(`/my-order`);
  };

  console.log("ini transaksinya", transaction);
  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  if (error) {
    return <p>Error loading transactions: {error.message}</p>;
  }
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px] ">
      {transaction ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3 ">
            <div className="md:w-7/12 lg:w-8/12 w-full space-y-4">
              {transaction.paymentMethod ===
                PaymentMethodType.BANK_TRANSFER && (
                <BankOptionsCard formik={formik} />
              )}
              {transaction.paymentMethod ===
                PaymentMethodType.MANUAL_TRANSFER && (
                <ManualTransfer totalPrice={transaction.finalPrice} />
              )}
              <RoomDetailCard />
            </div>
            <div className="md:w-5/12 lg:w-4/12 w-full ">
              <div className="sticky top-4">
                <PriceDetailsCard />
                {transaction.paymentMethod ===
                  PaymentMethodType.BANK_TRANSFER && (
                  <Buttons
                    value={"Book now"}
                    type={"submit"}
                    className={"w-full my-5 rounded-lg"}
                  />
                )}
                {transaction.paymentMethod ===
                  PaymentMethodType.MANUAL_TRANSFER && (
                  <Buttons
                    value={"My Order"}
                    className={"w-full my-5 rounded-lg"}
                    onClick={handleMyOrder}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default page;
