"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Buttons from "@/components/Buttons";
import BookCta from "./component/BookCta";
import FormCheckoutCard from "./component/FormCheckoutCard";
import PaymentMethodCard from "./component/PaymentMethodCard";
import CancelationCard from "./component/CancelationCard";
import ImportantInformationCard from "./component/ImportantInformationCard";
import RoomDetailCard from "./component/RoomDetailCard";
import PriceDetailsCard from "./component/PriceDetailsCard";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { TransactionRequest } from "@/types/transactions/TransactionRequestType";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CekResponse from "./[payment]/component/CekResponse";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { useGetPropertyBySlug } from "@/hooks/properties/useGetPropertyBySlug";
import NotFound from "../not-found";
import { useRoomBySlug } from "@/hooks/rooms/useRoomBySlug";

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
  const searchParams = useSearchParams();

  const propertySlug = searchParams.get("property");
  const roomSlug = searchParams.get("room");
  const fromSlug = searchParams.get("from");
  const toSlug = searchParams.get("to");
  const adultSlug = searchParams.get("adult");
  const childrenSlug = searchParams.get("children");
  console.log("ini property nya: ", propertySlug);
  console.log("ini room nya: ", roomSlug);
  console.log("ini from nya: ", fromSlug);
  console.log("ini to nya: ", toSlug);
  console.log("ini adult nya: ", adultSlug);
  console.log("ini children nya: ", childrenSlug);

  const { data: properties, isLoading: propertyLoading } = useGetPropertyBySlug(
    propertySlug || ""
  );

  const { data: room, isLoading: roomLoading } = useRoomBySlug(roomSlug || "");

  console.log("ini propertynya", properties);

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
          //alert("Transaction created successfully!");
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

  if (propertyLoading) return <LoadingStateAnimation />;
  if (roomLoading) return <LoadingStateAnimation />;

  if (!room) return <NotFound />;
  if (!properties) return <NotFound />;
  if (!adultSlug) return <NotFound />;
  if (!childrenSlug) return <NotFound />;
  if (!fromSlug) return <NotFound />;
  if (!toSlug) return <NotFound />;

  return (
    <div className="min-h-screen py-4 px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl py-3">
        Secure booking — only takes 2 minutes!
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
