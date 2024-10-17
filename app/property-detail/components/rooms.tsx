import React, { useEffect, useState } from "react";
import RoomCards from "@/app/property-detail/components/RoomCards";
import Buttons from "@/components/Buttons";
import { RoomType } from "@/types/rooms/RoomsType";
import useRefetchRooms from "@/hooks/useRefetchRooms";
import { CheckInDatePicker } from "@/app/property-detail/components/CheckInDatePicker";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { CheckoutDatePicker } from "./CheckOutDatePicker";

// const Rooms = ({ data }: { data: RoomType[] }) => {
//   console.log(data);
//   const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
//     refetch: false,
//     from: null,
//     to: null,
//     propertyId: null,
//   });

//   const handleClick = () => {
//     console.log(refetchStatus.to);
//     console.log(refetchStatus.from);
//     setRefetchStatus({ ...refetchStatus, refetch: true });
//     console.log(refetchStatus.refetch);
//   };

//   return (
//     <div id="rooms" className=" scroll-mt-20 ">
//       <h2 className={"text-2xl font-semibold my-6"}>Choose your room</h2>
//       <div></div>
//       <div
//         className={
//           "sticky top-[49px] flex z-20 pr-4 w-full justify-between  items-center bg-white shadow-custom rounded-xl"
//         }>
//         <div className={" w-1/2 items-center flex"}>
//           <CheckInDatePicker className={""} />
//           <div
//             className={
//               "hidden md:block min-w-[1px] h-8 bg-greenr ml-16 mr-4"
//             }></div>
//           <CheckoutDatePicker className={""} />
//         </div>
//         <Buttons
//           value={"Search"}
//           className={"col-span-2 !text-xs !p-1 md:!text-lg md:!p-4 h-fit w-fit"}
//           onClick={handleClick}
//         />
//       </div>

//       <div className={"grid md:grid-cols-4 gap-2 mt-5"}>
//         {data.map((room: RoomType, index: number) => (
//           <RoomCards data={room} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rooms;

// const Rooms = ({ data }: { data: RoomType[] }) => {
//   const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
//     refetch: false,
//     from: null,
//     to: null,
//     propertyId: null,
//   });
//   console.log("ini refre", refetchStatus);

//   const router = useRouter(); // Router untuk mengubah URL
//   const params = useSearchParams(); // Untuk mendapatkan parameter saat ini

//   const handleClick = () => {
//     // Mengambil tanggal from dan to dari refetchStatus
//     const fromDate = refetchStatus.from;
//     const toDate = refetchStatus.to;

//     if (fromDate && toDate) {
//       // Mengubah parameter URL berdasarkan tanggal baru
//       const searchParams = new URLSearchParams(params);
//       searchParams.set("from", format(fromDate, "yyyy-MM-dd"));
//       searchParams.set("to", format(toDate, "yyyy-MM-dd"));

//       // Update URL dan reload halaman
//       router.push(`?${searchParams.toString()}`);
//     }

//     // Set refetch menjadi true untuk melakukan permintaan ulang data
//     setRefetchStatus({ ...refetchStatus, refetch: true });
//   };

//   return (
//     <div id="rooms" className="scroll-mt-20">
//       <h2 className={"text-2xl font-semibold my-6"}>Choose your room</h2>
//       <div></div>
//       <div
//         className={
//           "sticky top-[49px] flex z-20 pr-4 w-full justify-between  items-center bg-white shadow-custom rounded-xl"
//         }>
//         <div className={"w-1/2 items-center flex"}>
//           <CheckInDatePicker className={""} />
//           <div
//             className={
//               "hidden md:block min-w-[1px] h-8 bg-greenr ml-16 mr-4"
//             }></div>
//           <CheckoutDatePicker className={""} />
//         </div>
//         <Buttons
//           value={"Search"}
//           className={"col-span-2 !text-xs !p-1 md:!text-lg md:!p-4 h-fit w-fit"}
//           onClick={handleClick}
//         />
//       </div>

//       <div className={"grid md:grid-cols-4 gap-2 mt-5"}>
//         {data.length > 0 ? (
//           data.map((room: RoomType, index: number) => (
//             <RoomCards data={room} key={index} />
//           ))
//         ) : (
//           <div className="col-span-full text-center text-lg text-red-600">
//             Room not available this date
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Rooms;

const Rooms = ({ data }: { data: RoomType[] }) => {
  const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
    refetch: false,
    from: null,
    to: null,
    propertyId: null,
  });
  console.log("ini refre", refetchStatus);

  const router = useRouter(); // Router untuk mengubah URL
  const params = useSearchParams(); // Untuk mendapatkan parameter saat ini

  const handleClick = () => {
    // Mengambil tanggal from dan to dari refetchStatus
    const fromDate = refetchStatus.from;
    const toDate = refetchStatus.to;

    if (fromDate && toDate) {
      // Mengubah parameter URL berdasarkan tanggal baru
      const searchParams = new URLSearchParams(params);
      searchParams.set("from", format(fromDate, "yyyy-MM-dd"));
      searchParams.set("to", format(toDate, "yyyy-MM-dd"));

      // Update URL dan reload halaman
      router.replace(`?${searchParams.toString()}`);

      // Set refetch menjadi true untuk melakukan permintaan ulang data
      setRefetchStatus({ ...refetchStatus, refetch: true });
    }
  };

  useEffect(() => {
    // Jika refetchStatus mengindikasikan perlu mengulangi data, panggil fungsi refetch
    if (refetchStatus.refetch) {
      // Anda mungkin perlu menambahkan logika di sini untuk memanggil kembali data

      setRefetchStatus({ ...refetchStatus, refetch: false });
    }
  }, [refetchStatus]);

  return (
    <div id="rooms" className="scroll-mt-20">
      <h2 className={"text-2xl font-semibold my-6"}>Choose your room</h2>
      <div></div>
      <div
        className={
          "sticky top-[49px] flex z-20 pr-4 w-full justify-between  items-center bg-white shadow-custom rounded-xl"
        }>
        <div className={"w-1/2 items-center flex"}>
          <CheckInDatePicker className={""} />
          <div
            className={
              "hidden md:block min-w-[1px] h-8 bg-greenr ml-16 mr-4"
            }></div>
          <CheckoutDatePicker className={""} />
        </div>
        <Buttons
          value={"Search"}
          className={"col-span-2 !text-xs !p-1 md:!text-lg md:!p-4 h-fit w-fit"}
          onClick={handleClick}
        />
      </div>

      <div className={"grid md:grid-cols-4 gap-2 mt-5"}>
        {data.length > 0 ? (
          data.map((room: RoomType, index: number) => (
            <RoomCards data={room} key={index} />
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-red-600">
            Room not available this date
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
