"use client";
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

// const OrderList = () => {
//   const {
//     data: transactions,
//     error,
//     isLoading,
//     refetch,
//   } = useTransactionsByUsersId();

//   if (isLoading) {
//     return <LoadingStateAnimation />;
//   }

//   if (error) {
//     return <ErrorAnimation />;
//   }

//   const refreshTransactions = () => {
//     refetch();
//   };

//   return (
//     <div className="">
//       {transactions && (
//         <Card className="">
//           <CardHeader>
//             <CardTitle>My Order</CardTitle>
//           </CardHeader>
//           <Separator className="mb-2" />
//           <CardContent className="space-y-4">
//             {transactions && transactions.length > 0
//               ? transactions.map((transaction) => (
//                   <div key={transaction.id}>
//                     <OrderListItem
//                       bookingCode={transaction.bookingCode}
//                       imgUrl={"/img"}
//                       totalPrice={transaction.finalPrice}
//                       propertyName={transaction.properties.name}
//                       status={transaction.status}
//                       paymentMethod={transaction.paymentMethod}
//                       transactionId={transaction.id}
//                       paymentProofs={transaction.paymentProofs}
//                       onRefresh={refreshTransactions}
//                       transactionDetails={transaction.transactionDetails[0]}
//                       review={transaction.reviews}
//                       room={transaction.transactionDetails[0].rooms}
//                     />
//                   </div>
//                 ))
//               : transactions &&
//                 transactions.length === 0 && (
//                   <EmptyDataAnimation
//                     message="No transactions so far, but good things are coming!"
//                     width={200}
//                     height={200}
//                   />
//                 )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

const OrderList: React.FC = () => {
  // const [page, setPage] = useState(0);
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
    setSort(value || null); // Jika string kosong, set ke null
    refetch();
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatus(status || null);
    refetch(); // Refresh data after status change
  };

  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  const refreshTransactions = () => {
    refetch();
  };

  const handlePageChange = (page: number) => {
    // Sesuaikan page yang dikirim ke backend (backend mulai dari 0)
    if (transactionPage && page > 0 && page <= transactionPage.totalPages) {
      setCurrentPage(page - 1); // Mengurangi 1 agar cocok dengan backend
    }
  };

  return (
    <div className="">
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
                    </div>
                  ))}

                  <PaginationControl
                    currentPage={currentPage}
                    totalPages={transactionPage?.totalPages || 0}
                    onPageChange={handlePageChange}
                  />

                </div>
              ))}
              <div className="mt-4 flex justify-center">
                {/* <Pagination
                  className="mt-4"
                  count={transactionPage.totalPages}
                  page={page + 1}
                  onChange={handlePageChange}
                /> */}

                {/*<Pagination*/}
                {/*  className="mt-4"*/}
                {/*  count={transactionPage.totalPages} // Jika menggunakan 'count'*/}
                {/*  page={page + 1} // Jika menggunakan 'page' untuk halaman aktif*/}
                {/*  onChange={handlePageChange}*/}
                {/*/>*/}
              </div>
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
    </div>
  );
};

export default OrderList;
