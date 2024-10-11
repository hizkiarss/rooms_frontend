"use client";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import React from "react";

const TestKirim = () => {
  const createTransaction = useCreateTransaction();

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     createTransaction.mutate({
  //       usersId: "1",
  //       propertiesId: "1",
  //       // finalPrice: 123123,
  //       //status: "Pending",
  //       paymentMethod: PaymentMethodType.BankTransfer,
  //       firstName: "user",
  //       lastName: "resu",
  //       mobileNumber: "+12323",
  //     });
  //   };

  return (
    //     <form onSubmit={handleSubmit}>
    //       {/* form fields */}
    //       <button type="submit">Submit</button>
    //     </form>

    <div></div>
  );
};

export default TestKirim;
