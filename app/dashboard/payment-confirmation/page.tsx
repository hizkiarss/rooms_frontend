import React from "react";
import PaymentVerificationList from "./component/PaymentVerificationList";
import { PaymentVerificationTable } from "./component/PaymentVerificationTable";

const page = () => {
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[100px]">
      {/* <PaymentVerificationTable /> */}
      <PaymentVerificationList />
    </div>
  );
};

export default page;
