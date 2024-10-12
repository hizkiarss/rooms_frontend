"use client";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import PaginationControl from "@/components/PaginationControl";
import SortAndFilter from "@/components/SortAndFIlter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionsByUsersId } from "@/hooks/transactions/useTransactionsByUsersId";
import { Separator } from "@radix-ui/react-select";
import React, { useState } from "react";
import OrderListItem from "./OrderListItem";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const pageSize = 5;

  const {
    data: transactionPage,
    error,
    isLoading,
    refetch,
  } = useTransactionsByUsersId(currentPage, pageSize, sort, status);

  const handleSortChange = (value: string | null) => {
    setSort(value || null);
    refetch();
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatus(status || null);
    refetch();
  };

  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  const handlePageChange = (page: number) => {
    if (transactionPage && page > 0 && page <= transactionPage.totalPages) {
      setCurrentPage(page - 1);
    }
  };

  if (error) {
    return <ErrorAnimation />;
  }

  const refreshTransactions = () => {
    refetch();
  };

  return (
    <>
      {transactionPage && (
        <>
          <Card className="">
            <CardHeader>
              <CardTitle>My Order</CardTitle>
            </CardHeader>
            <Separator className="mb-2" />
            <CardContent className="space-y-4">
              <SortAndFilter
                sort={sort}
                status={status}
                onSortChange={handleSortChange}
                onStatusChange={handleStatusFilterChange}
              />
              {transactionPage?.content &&
              transactionPage.content.length > 0 ? (
                <>
                  {transactionPage.content.map((transaction) => (
                    <div key={transaction.id}>
                      <AnimationWrapper
                        y={40}
                        transition={{ ease: "easeOut", duration: 1 }}>
                        <OrderListItem
                          bookingCode={transaction.bookingCode}
                          imgUrl="/img"
                          totalPrice={transaction.finalPrice}
                          propertyName={""}
                          status={transaction.status}
                          paymentMethod={transaction.paymentMethod}
                          transactionId={transaction.id}
                          paymentProofs={transaction.paymentProofs}
                          onRefresh={refreshTransactions}
                          transactionDetails={transaction.transactionDetails[0]}
                          review={transaction.reviews}
                          room={transaction.transactionDetails[0].rooms}
                        />
                      </AnimationWrapper>
                    </div>
                  ))}

                  <PaginationControl
                    currentPage={currentPage}
                    totalPages={transactionPage?.totalPages || 0}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <EmptyDataAnimation
                  message="No transactions so far, but good things are coming!"
                  width={200}
                  height={200}
                />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};
export default OrderList;
