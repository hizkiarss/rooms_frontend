import React, {useEffect} from 'react';
import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import HotelBali from "@/public/homepage/apartment.jpg"
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import {BedDouble, Grid3X3, UsersRound, Utensils} from "lucide-react";
import Buttons from "@/components/Buttons";
import {RoomType} from "@/types/rooms/RoomsType";


const amenities = [
    "High-Speed Internet Access",
    "Fitness Center",
    "Swimming Pool",
    "Spa and Wellness",
    "Airport Shuttle",
    "Childcare Services",
    "Disability Support",
    "Bar/Lounge",
    "24-Hour Front Desk",
    "Hot Tub",
];
const RoomCards = ({data}: { data: RoomType }) => {

    useEffect(() => {
        console.log(data)
        console.log(data.name)
    }, []);
    return (
        <div className={"rounded-lg border border-slate-300 h-fit "}>
            <Carousel className={""}>
                <CarouselContent className={"h-[200px]"}>
                    {data.roomPictures && data.roomPictures.length > 0 ? (
                        data.roomPictures.map((picture, index) => (
                            <CarouselItem key={index}>
                                <Image src={picture.imgUrl} alt={`Room image ${index + 1}`} width={100} height={100} className="rounded-t-lg w-full h-full" />
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                            <div className="h-full flex items-center justify-center bg-gray-200 rounded-t-lg">
                                <p>No pictures available</p>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious className={"translate-x-16"}/>
                <CarouselNext className={"-translate-x-16"}/>
            </Carousel>
            <div className={"px-4 pt-3 pb-5 flex flex-col justify-between "}>
                <div>
                    <p className={"font-semibold"}>{data.name}</p>
                    <div className={"grid grid-cols-2 gap-y-3 mt-4 text-[13px]"}>

                        <div className={"flex gap-2 items-center text-sm"}>
                            <Grid3X3/>
                            <p className={"-mb-1"}>{data.roomArea} m</p>
                        </div>

                        {data.includeBreakfast ? <div className={"flex gap-2 items-center"}>
                            <Utensils size={"18"}/>
                            <p className={"-mb-1"}>Include breakfast</p>
                        </div>
                        : null}


                        <div className={"flex gap-2 items-center"}>
                            <UsersRound size={"18"}/>
                            <p className={"-mb-1"}>Sleeps {data.capacity}</p>
                        </div>

                        <div className={"flex gap-2 items-center"}>
                            <BedDouble size={"18"}/>
                            <p className={"-mb-1"}>{data.bedTypes.name}</p>
                        </div>

                    </div>
                </div>

                <div className={"flex justify-between mt-10 items-center"}>
                    <div>
                        <p className={"text-red-600 font-semibold text-xl"}>
                            IDR {new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(data.price)}
                        </p>
                        <p className={"text-slate-400 text-sm mt-[2px]"}>/night/room</p>
                    </div>
                    <Buttons value={"Reserve"} className={"text-lg"}></Buttons>
                </div>

            </div>


        </div>
    );
};

export default RoomCards;