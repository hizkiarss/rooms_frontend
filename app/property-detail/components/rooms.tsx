import React, {useEffect} from 'react';
import {DatePickerPropertyDetail} from './DatePickerPropertyDetail';
import RoomCards from "@/app/property-detail/components/RoomCards";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import HotelBali from "@/public/homepage/apartment.jpg";
import {BedDouble, Grid3X3, UsersRound, Utensils} from "lucide-react";
import Buttons from "@/components/Buttons";
import data from "@react-google-maps/api/src/components/drawing/Data";
import {RoomType} from "@/types/rooms/RoomsType";
import {log} from "node:util";


const Rooms = ({data}: { data: RoomType[] }) => {
    console.log(data)
    return (

        <div id="rooms" className=" scroll-mt-20 ">
            <h2 className={"text-2xl font-semibold my-6"}>Choose your room</h2>
            <div className={"sticky top-[49px] z-20"}>
                <DatePickerPropertyDetail className={""}/>

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