"use client";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionsByUsersId } from "@/hooks/transactions/useTransactionsByUsersId";
import { Separator } from "@radix-ui/react-select";
import React from "react";
import OrderListItem from "./OrderListItem";

const OrderList = () => {
  const {
    data: transactions,
    error,
    isLoading,
    refetch,
  } = useTransactionsByUsersId();

  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  // if (error) {
  //   return <ErrorAnimation />;
  // }

  const refreshTransactions = () => {
    refetch();
  };

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>My Order</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent className="space-y-4">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <OrderListItem
                  bookingCode={transaction.bookingCode}
                  imgUrl={"/img"}
                  totalPrice={transaction.finalPrice}
                  propertyName={transaction.properties.name}
                  status={transaction.status}
                  paymentMethod={transaction.paymentMethod}
                  transactionId={transaction.id}
                  paymentProofs={transaction.paymentProofs}
                  onRefresh={refreshTransactions}
                  transactionDetails={transaction.transactionDetails[0]}
                  review={transaction.reviews}
                />
              </div>
            ))
          ) : (
            <EmptyDataAnimation
              message="No transactions so far, but good things are coming!"
              width={200}
              height={200}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;
