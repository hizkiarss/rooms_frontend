"use client";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import React from "react";
import OrderList from "./component/OrderList";

const page = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-[130px]">
      <OrderList />
      <div>{/* <LoadingStateAnimation /> */}</div>
    </div>
  );
};

export default page;
