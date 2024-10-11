"use client";

import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { Suspense } from "react";
import CheckoutComponent from "./component/CheckoutComponent";

const Page = () => {
  return (
    <Suspense fallback={<LoadingStateAnimation />}>
      <CheckoutComponent />
    </Suspense>
  );
};
export default Page;
