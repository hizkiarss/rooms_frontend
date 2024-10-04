"use client";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
// const OrderList: React.FC = () => {
//   // const [page, setPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 5;

//   const {
//     data: transactionPage,
//     error,
//     isLoading,
//     refetch,
//   } = useTransactionsByUsersId(currentPage, pageSize);

//   if (isLoading) {
//     return <LoadingStateAnimation />;
//   }

//   if (error) {
//     return <ErrorAnimation />;
//   }

//   const refreshTransactions = () => {
//     refetch();
//   };

//   const handlePageChange = (page: number) => {
//     // Sesuaikan page yang dikirim ke backend (backend mulai dari 0)
//     if (transactionPage && page > 0 && page <= transactionPage.totalPages) {
//       setCurrentPage(page - 1); // Mengurangi 1 agar cocok dengan backend
//     }
//   };

//   return (
//     <div className="">
//       <Card className="">
//         <CardHeader>
//           <CardTitle>My Order</CardTitle>
//         </CardHeader>
//         <Separator className="mb-2" />
//         <CardContent className="space-y-4">
//           {transactionPage?.content && transactionPage.content.length > 0 ? (
//             <>
//               {transactionPage.content.map((transaction) => (
//                 <div key={transaction.id}>
//                   <OrderListItem
//                     bookingCode={transaction.bookingCode}
//                     imgUrl="/img"
//                     totalPrice={transaction.finalPrice}
//                     propertyName={transaction.properties.name}
//                     status={transaction.status}
//                     paymentMethod={transaction.paymentMethod}
//                     transactionId={transaction.id}
//                     paymentProofs={transaction.paymentProofs}
//                     onRefresh={refreshTransactions}
//                     transactionDetails={transaction.transactionDetails[0]}
//                     review={transaction.reviews}
//                     room={transaction.transactionDetails[0].rooms}
//                   />
//                 </div>
//               ))}

//               <div className="mt-4 flex justify-center">
//                 <Pagination className={"mt-4"}>
//                   <PaginationContent>
//                     <PaginationItem>
//                       <PaginationPrevious
//                         href="#"
//                         onClick={() =>
//                           currentPage > 0 && handlePageChange(currentPage)
//                         } // CurrentPage sudah sesuai dengan backend
//                         aria-disabled={currentPage === 0}
//                         className={"disabled:hidden font-semibold text-greenr "}
//                       />
//                     </PaginationItem>

//                     {/* Sesuaikan nomor halaman yang ditampilkan (ditambah 1) */}
//                     {Array.from(
//                       { length: transactionPage?.totalPages || 0 },
//                       (_, index) => (
//                         <PaginationItem key={index}>
//                           <PaginationLink
//                             isActive={currentPage === index}
//                             onClick={() => handlePageChange(index + 1)} // Tambahkan 1 untuk frontend
//                             className={"font-semibold text-greenr"}>
//                             {index + 1}{" "}
//                             {/* Tampilkan halaman sebagai 1-based */}
//                           </PaginationLink>
//                         </PaginationItem>
//                       )
//                     )}

//                     <PaginationItem>
//                       <PaginationNext
//                         onClick={() =>
//                           currentPage < transactionPage?.totalPages - 1 &&
//                           handlePageChange(currentPage + 2)
//                         } // Sesuaikan agar logika maju ke halaman berikutnya
//                         aria-disabled={
//                           currentPage === transactionPage?.totalPages - 1
//                         }
//                         className={"disabled:hidden font-semibold text-greenr "}
//                       />
//                     </PaginationItem>
//                   </PaginationContent>
//                 </Pagination>
//               </div>
//             </>
//           ) : (
//             <EmptyDataAnimation
//               message="No transactions so far, but good things are coming!"
//               width={200}
//               height={200}
//             />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OrderList;

const OrderList: React.FC = () => {
  // const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Success");
  const pageSize = 5;

  const {
    data: transactionPage,
    error,
    isLoading,
    refetch,
  } = useTransactionsByUsersId(currentPage, pageSize, sort, status);

  const handleSortChange = (value: string) => {
    setSort(value || null); // Jika string kosong, set ke null
    refetch();
  };

  const handleStatusFilterChange = (status: string) => {
    setStatus(status);
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
      <Card className="">
        <CardHeader>
          <CardTitle>My Order</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              onValueChange={handleSortChange}
              defaultValue={sort || undefined}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASC">Newest</SelectItem>
                <SelectItem value="Desc">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => handleStatusFilterChange("")}>
                All
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusFilterChange("Success")}>
                Success
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusFilterChange("Pending")}>
                Pending
              </Button>
              <Button
                variant="outline"
                onClick={() => handleStatusFilterChange("Cancelled")}>
                Cancelled
              </Button>
            </div>
          </div>
          {transactionPage?.content && transactionPage.content.length > 0 ? (
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

              <div className="mt-4 flex justify-center">
                <Pagination className={"mt-4"}>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          currentPage > 0 && handlePageChange(currentPage)
                        } // CurrentPage sudah sesuai dengan backend
                        aria-disabled={currentPage === 0}
                        className={"disabled:hidden font-semibold text-greenr "}
                      />
                    </PaginationItem>

                    {/* Sesuaikan nomor halaman yang ditampilkan (ditambah 1) */}
                    {Array.from(
                      { length: transactionPage?.totalPages || 0 },
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === index}
                            onClick={() => handlePageChange(index + 1)} // Tambahkan 1 untuk frontend
                            className={"font-semibold text-greenr"}>
                            {index + 1}{" "}
                            {/* Tampilkan halaman sebagai 1-based */}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          currentPage < transactionPage?.totalPages - 1 &&
                          handlePageChange(currentPage + 2)
                        } // Sesuaikan agar logika maju ke halaman berikutnya
                        aria-disabled={
                          currentPage === transactionPage?.totalPages - 1
                        }
                        className={"disabled:hidden font-semibold text-greenr "}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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
