import PropertyReservationDetailCard from "./PropertyReservationDetailCard";
import ReservationDetailsCard from "./ReservationDetailsCard";
import ReservationPaymentCard from "./ReservationPaymentCard";

const Reservation = () => {
  return (
    <div className=" flex flex-col space-y-4">
      <PropertyReservationDetailCard />
      <ReservationDetailsCard
        orderId="orderID"
        checkIn="cekin"
        checkOut="cekot"
        guestName="oblaay"
        roomType="room type"
        guestCount={1}
      />
      <ReservationPaymentCard />
    </div>
  );
};
export default Reservation;
