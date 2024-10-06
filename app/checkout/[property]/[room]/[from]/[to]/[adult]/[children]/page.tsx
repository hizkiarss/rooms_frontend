"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/Buttons";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { TransactionRequest } from "@/types/transactions/TransactionRequestType";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { useParams, useRouter } from "next/navigation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import FormCheckoutCard from "@/app/checkout/component/FormCheckoutCard";
import PaymentMethodCard from "@/app/checkout/component/PaymentMethodCard";
import CancelationCard from "@/app/checkout/component/CancelationCard";
import ImportantInformationCard from "@/app/checkout/component/ImportantInformationCard";
import RoomDetailCard from "@/app/checkout/component/RoomDetailCard";
import BookCta from "@/app/checkout/component/BookCta";
import PriceDetailsCard from "@/app/checkout/component/PriceDetailsCard";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobileNumber: Yup.string()
    .matches(/^\+\d{2,3}\s\d{3,}(-\d{3,4}){1,}$/, "Invalid phone number format")
    .required("Phone number is required"),
  paymentMethod: Yup.string()
    .oneOf(["manual", "bank"], "Please select a valid payment method")
    .required("Payment method is required"),
});

const Page = () => {
  const router = useRouter();
  const createTransaction = useCreateTransaction();
  const formatDate = (date: string | Date) => {
    return new Date(date).toISOString().split("T")[0];
  };
  const { property, room, from, to, adult, children } = useParams<{
    property: string;
    room: string;
    from: string;
    to: string;
    adult: string;
    children: string;
  }>();
  console.log("ini property nya: ", property);
  console.log("ini room nya: ", room);
  console.log("ini from nya: ", from);
  console.log("ini to nya: ", to);
  console.log("ini adult nya: ", adult);
  console.log("ini children nya: ", children);

  const formik = useFormik({
    initialValues: {
      travelerName: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      paymentMethod: "manual",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // <LoadingStateAnimation />;
      const paymentMethod =
        values.paymentMethod === "manual"
          ? PaymentMethodType.MANUAL_TRANSFER
          : PaymentMethodType.BANK_TRANSFER;
      const transactionRequest: TransactionRequest = {
        usersId: "1",
        propertiesId: "1",
        paymentMethod: paymentMethod,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        transactionDetailRequests: {
          roomId: "10",
          startDate: formatDate("2024-09-26"),
          endDate: formatDate("2024-09-27"),
        },
      };
      createTransaction.mutate(transactionRequest, {
        onSuccess: (randomString) => {
          console.log("ini on success");
          setSubmitting(false);
          router.push(`/checkout/${randomString}`);
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="min-h-screen py-4 px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl py-3">
        Secure booking — only takes 2 minutes! oioi
      </h1>
      <div className="flex items-center text-green-700 py-3">
        <Check className="w-5 h-5 mr-2" />
        <span>You&apos;ve picked a winner! This hotel is rated 8.8/10.</span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-7/12 lg:w-8/12 w-full">
            <FormCheckoutCard formik={formik} />
            <PaymentMethodCard formik={formik} />
            <CancelationCard />
            <ImportantInformationCard />
          </div>
          <div className="md:w-5/12 lg:w-4/12 w-full space-y-4 ">
            <RoomDetailCard />
            <BookCta />
            <PriceDetailsCard />
            <Buttons
              value={"Book now"}
              type={"submit"}
              className={"w-full my-5 rounded-lg"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Page;
