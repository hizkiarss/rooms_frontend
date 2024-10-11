"use client";
import NoDataFoundAnimation from "@/components/animations/DataNotFoundAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { useTransactionsByBookingCode } from "@/hooks/transactions/useTransactionsByBookingCode";
import { useParams } from "next/navigation";
import PropertyReservationDetailCard from "./PropertyReservationDetailCard";
import ReservationDetailsCard from "./ReservationDetailsCard";
import ReservationPaymentCard from "./ReservationPaymentCard";

const Reservation: React.FC = () => {
  const { bookingCode } = useParams<{ bookingCode: string }>();
  const {
    data: transaction,
    isLoading,
    error,
  } = useTransactionsByBookingCode(bookingCode);

  if (isLoading) return <LoadingStateAnimation />;

  if (error) return <ErrorAnimation />;

  const guestName =
    (transaction?.firstName || "") + " " + (transaction?.lastName || "");
  console.log("ini transaksinya", transaction);

  const startDate: Date = new Date(
    transaction?.transactionDetails[0].startDate || ""
  );

  const endDate: Date = new Date(
    transaction?.transactionDetails[0].endDate || ""
  );

  const timeDifference: number = endDate.getTime() - startDate.getTime();

  const dayDifference: number = timeDifference / (1000 * 3600 * 24);

  const subtotal =
    (transaction?.transactionDetails[0].price || 0) * dayDifference;

  const formattedEndDate: string = new Date(endDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedStartDate: string = new Date(startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedFinalPrice: string = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(transaction?.finalPrice || 0);

  const formattedRoomPrice: string = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(transaction?.transactionDetails[0].price || 0);

  const formattedTax: string = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(transaction?.tax || 0);

  const formattedSubTotal: string = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <div className=" flex flex-col space-y-4">
      {transaction && transaction ? (
        <>
          <PropertyReservationDetailCard
            propertyName={transaction.properties.name}
            propertyAddress={transaction.properties.name}
            imgUrl={transaction.properties.propertyPictures[0].imgUrl}
            slug={transaction.properties.slug}
          />
          <ReservationDetailsCard
            orderId={transaction.bookingCode}
            checkIn={formattedStartDate}
            checkOut={formattedEndDate}
            guestName={guestName}
            bedType={transaction.transactionDetails[0].rooms.bedTypes.name}
            adult={transaction.adult}
            childrenNumber={transaction.children}
            facility={transaction.properties.propertyFacilities}
            night={dayDifference}
            roomName={transaction.transactionDetails[0].rooms.name}
            status={transaction.status}
          />
          <ReservationPaymentCard
            propertyName={transaction.properties.name}
            roomName={transaction.transactionDetails[0].rooms.name}
            totalPrice={formattedFinalPrice}
            roomPrice={formattedRoomPrice}
            paymentMethod={transaction.paymentMethod}
            night={dayDifference}
            tax={formattedTax}
            subTotal={formattedSubTotal}
          />
        </>
      ) : (
        <>
          <NoDataFoundAnimation />
        </>
      )}
    </div>
  );
};
export default Reservation;
