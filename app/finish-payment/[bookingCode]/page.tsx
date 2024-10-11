"use client";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import Buttons from "@/components/Buttons";
import FinishPayment from "@/components/FinishPayment";
import VirtualAccountPayment from "@/components/FinishPayment";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push(`/my-order`);
  };
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[80px] py-8 flex flex-col items-center ">
      <FinishPayment />
      <Buttons
        value={"My Order"}
        className={"w-full text-center max-w-3xl my-5 rounded-lg"}
        onClick={handleBtn}
      />
    </div>
  );
};

export default Page;
