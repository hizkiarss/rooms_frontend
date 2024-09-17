"use client";
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

  if (error) {
    return <p>Error loading transactions: {error.message}</p>;
  }
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
          {transactions &&
            transactions.map((transaction) => (
              <div>
                <OrderListItem
                  key={transaction.id}
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
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;
