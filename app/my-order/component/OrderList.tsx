"use client";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { useTransactionsByUsersId } from "@/hooks/transactions/useTransactionsByUsersId";
import { Separator } from "@radix-ui/react-select";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
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

// export default OrderList;
const OrderList: React.FC = () => {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const {
    data: transactionPage,
    error,
    isLoading,
    refetch,
  } = useTransactionsByUsersId(page, pageSize);

  if (isLoading) {
    return <LoadingStateAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  const refreshTransactions = () => {
    refetch();
  };

  // const handlePageChange = (
  //   _event: React.ChangeEvent<unknown>,
  //   newPage: number
  // ) => {
  //   setPage(newPage - 1);
  // };

  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage - 1);
  // };

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPage(newPage - 1);
  // }
  return (
      <Card className="">
        <CardHeader>
          <CardTitle>My Order</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent className="space-y-4">
          {transactionPage?.content && transactionPage.content.length > 0 ? (
            <>
              {transactionPage.content.map((transaction) => (
                <div key={transaction.id}>
                  <OrderListItem
                    bookingCode={transaction.bookingCode}
                    imgUrl="/img"
                    totalPrice={transaction.finalPrice}
                    propertyName={transaction.properties.name}
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
  );
};

export default OrderList;
