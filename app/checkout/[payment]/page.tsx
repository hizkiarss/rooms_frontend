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
import { useRoomPrice } from "@/hooks/rooms/useRoomPrice";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const validationSchema = Yup.object({
  bank: Yup.string().required("Bank is required"),
});

const Page = () => {
  const router = useRouter();
  const { payment: bookingCode } = useParams<{ payment: string }>();

  const {
    data: transaction,
    isLoading,
    error,
  } = useTransactionsByBookingCode(bookingCode);
  const createVirtualAccountCode = useCreateVirtualAccountCode();
  const savePaymentInitial = useSavePaymentIntial();
  const startDateString = transaction?.transactionDetails[0]?.startDate;

  const fromDate = new Date(
    transaction?.transactionDetails[0].startDate || " "
  );
  console.log("ini formDate", fromDate);
  const toDate = new Date(transaction?.transactionDetails[0].endDate || " ");

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedFromDate = fromDate.toLocaleDateString("en-US", options);
  const formattedToDate = toDate.toLocaleDateString("en-US", options);
  const differenceInMilliseconds = toDate.getTime() - fromDate.getTime();

  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

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
    console.log(error);
    return <ErrorAnimation />;
  }
  return (
    <div className="min-h-screen py-4 px-5 sm:px-10 md:px-20 lg:px-[130px] ">
      {transaction ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3 ">
            <div className="md:w-7/12 lg:w-8/12 w-full space-y-4">
              {transaction.paymentMethod ===
                PaymentMethodType.BANK_TRANSFER && (
                <BankOptionsCard
                  createdAt={transaction.createdAt}
                  formik={formik}
                />
              )}
              {transaction.paymentMethod ===
                PaymentMethodType.MANUAL_TRANSFER && (
                <ManualTransfer
                  createdAt={transaction.createdAt}
                  totalPrice={transaction.finalPrice}
                  transactionId={transaction.id}
                  paymentProof={transaction.paymentProofs}
                />
              )}
              <RoomDetailCard
                images={transaction.properties.propertyPictures}
                propertyName={transaction.properties.name}
                rating={transaction.properties.averageRating}
                review={transaction.properties.totalReview}
                roomName={transaction.transactionDetails[0].rooms.name}
                from={formattedFromDate}
                to={formattedToDate}
                night={differenceInDays}
              />
            </div>
            <div className="md:w-5/12 lg:w-4/12 w-full ">
              <div className="sticky top-4">
                {/* <PriceDetailsCard
                  price={transaction.transactionDetails[0].price || 0}
                  night={differenceInDays}
                /> */}
                <PriceDetailsCard
                  price={Math.round(
                    transaction.transactionDetails[0]?.price || 0
                  )}
                  night={differenceInDays}
                />
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
        <NoDataFoundAnimation />
      )}
    </div>
  );
};

export default Page;
