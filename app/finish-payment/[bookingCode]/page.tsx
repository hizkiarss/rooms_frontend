import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import VirtualAccountPayment from "@/components/VirtualAccountPayment";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <VirtualAccountPayment />
      {/* <NoDataFoundAnimation /> */}
      {/* <ErrorAnimation /> */}
    </div>
  );
};

export default page;
