"use client";

import Buttons from "@/components/Buttons";
import FinishPayment from "@/components/FinishPayment";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push(`/user-profile`);
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
