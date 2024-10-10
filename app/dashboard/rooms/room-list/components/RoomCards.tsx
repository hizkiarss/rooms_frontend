import React, {useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import {BedDouble, Grid3X3, UsersRound, Utensils} from "lucide-react";
import Buttons from "@/components/Buttons";
import LoginFirstPopup from "@/app/property-detail/components/LoginFirstPopup";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import {RoomType} from "@/types/rooms/RoomsType";

const RoomCards = ({data}: { data: RoomType[] | null }) => {
    const [openLoginFirstPopup, setOpenLoginFirstPopup] = useState(false);

    const handleClick = (slug: string) => {
        setOpenLoginFirstPopup(true);
    };

    if (!data || data.length === 0) {
        return <div>No properties available.</div>;
    }


    return (
        <div className={"grid grid-cols-5 gap-6 px-10"}>
            <>
                {data.map((room: RoomType) => (
                    <div key={room.id} className="rounded-lg border border-slate-300 h-fit">
                            <Carousel>
                                <CarouselContent className="h-[200px]">
                                    {room.roomPictures && room.roomPictures.length > 0 ? (
                                        room.roomPictures.map((picture, index) => (
                                            <CarouselItem key={index}>
                                                <Image src={picture.imgUrl} alt={`Room image ${index + 1}`} width={100}
                                                       height={100}
                                                       className="rounded-t-lg w-full h-full object-cover"/>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem>
                                            <div
                                                className="h-full flex items-center justify-center bg-gray-200 rounded-t-lg">
                                                <p>No pictures available</p>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious className="translate-x-16"/>
                                <CarouselNext className="-translate-x-16"/>
                            </Carousel>

                        <div className="px-4 pt-3 pb-5 flex flex-col justify-between">

                            <div>
                                    <div className={"flex justify-between"}>
                                        <p className="font-semibold">{room.name}</p>
                                        <p className={"font-semibold"}>{room.roomNumber}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 mt-4 text-[13px]">
                                        <div className="flex gap-2 items-center text-sm">
                                            <Grid3X3/>
                                            <p className="-mb-1">{room.roomArea} m²</p>
                                        </div>
                                        {room.includeBreakfast && (
                                            <div className="flex gap-2 items-center">
                                                <Utensils size={18}/>
                                                <p className="-mb-1">Include breakfast</p>
                                            </div>
                                        )}
                                        <div className="flex gap-2 items-center">
                                            <UsersRound size={18}/>
                                            <p className="-mb-1">Sleeps {room.capacity}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <BedDouble size={18}/>
                                            <p className="-mb-1">{room.bedTypes.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-10 ">
                                    <div>
                                        <p className="text-red-600 font-semibold text-lg">
                                            IDR {new Intl.NumberFormat('id-ID', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }).format(room.price)}
                                        </p>
                                        <p className="text-slate-400 text-sm mt-[2px]">/night/room</p>
                                    </div>

                                    {room.isAvailable ?
                                        <p className={"text-sm font-semibold text-green-600"}>Available</p> :
                                        <p className={"text-sm font-semibold text-red-600"}>Not available</p>}
                                    {/*<Buttons value="On maintenance" className="text-xs w-fit h-fit" />*/}
                                </div>
                            </div>

                    </div>

                    // </div>
                ))}
                <LoginFirstPopup
                    title="Login needed"
                    content="Please login first to create a transaction."
                    isOpen={openLoginFirstPopup}
                    onClose={() => setOpenLoginFirstPopup(false)}
                />
            </>
        </div>
    );
};

export default RoomCards;