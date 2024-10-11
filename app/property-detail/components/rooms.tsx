import React, {useEffect, useState} from 'react';
import RoomCards from "@/app/property-detail/components/RoomCards";
import Buttons from "@/components/Buttons";
import {RoomType} from "@/types/rooms/RoomsType";
import {CheckOutDatePicker} from "@/app/property-detail/components/CheckOutDatePicker";
import useRefetchRooms from "@/hooks/useRefetchRooms";
import {CheckInDatePicker} from "@/app/property-detail/components/CheckInDatePicker";


const Rooms = ({data}: { data: RoomType[] }) => {

    console.log(data)
    const { refetchStatus, setRefetchStatus, isLoading } = useRefetchRooms({
        refetch: false,
        from: null,
        to: null,
        propertyId:null
    });

    const handleClick=()=>{
        console.log(refetchStatus.to);
        console.log(refetchStatus.from);
        setRefetchStatus({...refetchStatus, refetch: true})
        console.log(refetchStatus.refetch)
    }


    return (
        <div id="rooms" className=" scroll-mt-20 ">
            <h2 className={"text-2xl font-semibold my-6"}>Choose your room</h2>
            <div>
            </div>
            <div
                className={"sticky top-[49px] flex z-20 pr-4 w-full justify-between  items-center bg-white shadow-custom rounded-xl"}>
                <div className={"col-span-10 w-1/2 items-center flex"}>
                    <CheckInDatePicker className={""} />
                    <div className={"min-w-[1px] h-8 bg-greenr ml-16 mr-4"}></div>
                    <CheckOutDatePicker className={""} />
                </div>
                <Buttons value={"Search"} className={"col-span-2 h-fit w-fit"} onClick={handleClick} />
            </div>

            <div className={"grid grid-cols-4 gap-2 mt-5"}>
                {data.map((room: RoomType, index: number) => (
                    <RoomCards data={room} key={index}/>
                ))}
            </div>


        </div>


    );
};

export default Rooms;