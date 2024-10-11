import React from "react";
import MyForm from "./component/UploadPaymentProofForm";
import PaymentVerificationList from "./component/PaymentVerificationList";
import { PaymentVerificationTable } from "./component/PaymentVerificationTable";

const page = () => {
  return (
    // <div className="px-5 sm:px-10 md:px-20 lg:px-[100px]">
    <div className="p-4">
      {/* <PaymentVerificationTable /> */}
      <PaymentVerificationList />
      {/* <MyForm transactionId="41" /> */}
    </div>
  );
};

export default page;
