import React from 'react';
import {useGetFilteredRoomsByPropertyId} from "@/hooks/rooms/useGetFilteredRoomsByPropertyId";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Buttons from "@/components/Buttons";
import {RoomType} from "@/types/rooms/RoomsType";
import Image from "next/image";
import {ArrowRight, ArrowUpRight, BedDouble, Grid3X3, UsersRound, Utensils} from "lucide-react";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";

const MostBookedCarousel = () => {
    const {selectedProperty} = useSelectedProperty()
    const {data: RoomsData, error, refetch, isLoading} = useGetFilteredRoomsByPropertyId({
        propertyId: selectedProperty || "",
        isAvailable: null,
        roomName: null,
        pageNumber: 0,
        pageSize: 5,
    });

    if (isLoading) {
        return <LoadingStateAnimation/>;
    }

    console.log(selectedProperty)

    console.log(RoomsData)

    return (
        <div className={""}>
            <div className={"flex justify-between items-end mb-3 "}>
                <h2 className={"font-semibold text-xl tmd:text-3xl"}>See all rooms</h2>
                <div className={"flex gap-1 text-greenr"}>
                    <p className={"text-xs"}>Slide for more</p>
                    <ArrowRight size={14}/>
                </div>
            </div>

            {RoomsData?.totalElements ?? 0 > 0 ? (
                <Carousel>
                    <CarouselContent className={""}>
                        {RoomsData?.rooms.map((room: RoomType) => (
                            <CarouselItem className="basis-2/3 md:basis-1/5 ml-4 pl-0 rounded-lg border border-slate-300 h-fit "
                                          key={room.id}>
                                <Carousel className={"ml-0"}>
                                    <CarouselContent className="h-[150px] md:h-[200px] ">
                                        {room.roomPictures && room.roomPictures.length > 0 ? (
                                            room.roomPictures.map((picture, index) => (
                                                <CarouselItem key={index}>
                                                    <Image
                                                        src={picture.imgUrl}
                                                        alt={`Room image ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-t-lg w-full h-full object-cover"
                                                    />
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
                                        <div className={"flex flex-col  justify-between"}>
                                            <p className="font-semibold text-sm md:text-base">{room.name}</p>
                                            <p className={"text-xs md:text-sm"}>Room number : {room.roomNumber}</p>
                                        </div>
                                        <div className="grid  grid-cols-2 gap-y-3 mt-4 text-xs md:text-[13px]">
                                            <div className="flex gap-2 items-center text-sm">
                                                <Grid3X3 size={18}/>
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

                                    {/* Price and Availability */}
                                    <div className="flex items-center justify-between mt-10">
                                        <div>
                                            <p className="text-red-600 font-semibold text-lg">
                                                IDR {new Intl.NumberFormat('id-ID', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            }).format(room.price)}
                                            </p>
                                            <p className="text-slate-400 text-sm mt-[2px]">/night/room</p>
                                        </div>
                                        {room.isAvailable ? (
                                            <p className="text-sm font-semibold text-green-600">Available</p>
                                        ) : (
                                            <p className="text-sm font-semibold text-red-600">Not available</p>
                                        )}
                                    </div>
                                </div>

                            </CarouselItem>
                        ))}
                        <div
                            className={"w-[200px] flex items-center justify-center bg-greenr text-white ml-2 rounded-r-3xl cursor-pointer hover:bg-white hover:text-greenr hover: border-4 hover:border-greenr transition duration-200"}
                            onClick={() => window.location.href = "/dashboard/rooms/room-list"}>
                            <CarouselItem
                                className={"w-[200px] flex flex-col items-start justify-between h-full py-10"}>
                                <div>
                                    <p className={"text-5xl"}>See </p>
                                    <p className={"text-5xl"}>all</p>
                                    <p className={"text-5xl"}>rooms </p>
                                </div>

                                <div className={"flex justify-end w-full pr-2"}>
                                    <ArrowUpRight size={62}/>
                                </div>

                            </CarouselItem>
                        </div>

                    </CarouselContent>
                </Carousel>

            ) : (<div className={"border border-slate-400 rounded-xl py-6 flex flex-col gap-2 items-center"}>
                    <EmptyDataAnimation width={200} height={200} message={"No rooms yet."}/>
                    <Buttons value={"Should we make one now?"}
                             onClick={() => window.location.href = "/dashboard/rooms/create-room"}/>
                </div>
                )}


        </div>
    );
};

export default MostBookedCarousel;
