import React, {useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {BedDouble, Grid3X3, UsersRound, Utensils} from "lucide-react";
import Buttons from "@/components/Buttons";
import {RoomType} from "@/types/rooms/RoomsType";
import {useSetUnavailable} from "@/hooks/rooms/useSetUnavailable";
import {useSetAvailable} from "@/hooks/rooms/useSetAvailable";
import Image from 'next/image';
import {useDeleteRoom} from "@/hooks/rooms/useDeleteRoom";
import {useSession} from "next-auth/react";
import LoadingAnimation from "@/components/animations/LoadingAnimation";


interface RoomCardsProps {
    data: RoomType[] | null;
    refetch: () => void;  // Add this line
}


const RoomCards: React.FC<RoomCardsProps> = ({data, refetch}) => {
    const {data: session} = useSession();
    const setUnavailableMutation = useSetUnavailable();
    const setAvailableMutation = useSetAvailable();
    const deleteRoomMutation = useDeleteRoom()

    const handleAvailabilityToggle = async (room: RoomType) => {
        try {
            if (room.isAvailable) {
                await setUnavailableMutation.mutateAsync({roomId: room.id});
            } else {
                await setAvailableMutation.mutateAsync({roomId: room.id});
            }
            refetch();
        } catch (error) {
            console.error("Error toggling room availability:", error);
        }
    };

    const handleDeleteRoom = async (roomId: string) => {
        if (!session?.user?.email) {
            console.error("No user email found");
            return;
        }
        try {
            await deleteRoomMutation.mutateAsync({
                id: roomId,
                email: session.user.email

            });
            refetch();
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };


    if (!data) {
        return <div>No properties available.</div>;
    }

    const isLoading = setAvailableMutation.isPending || setUnavailableMutation.isPending;

    return (
        <div className={"grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-5 md:px-10"}>
            <>
                {data.map((room: RoomType) => (
                    <div key={room.id} className="md:block rounded-lg border border-slate-300 h-fit">
                        <Carousel>
                            <CarouselContent className="h-[100px] md:h-[200px]">
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

                            <div className={""}>
                                <div className={"flex flex-col  justify-between"}>
                                    <p className="font-semibold text-sm md:text-base">{room.name}</p>
                                    <p className={"text-xs md:text-sm"}>Room number : {room.roomNumber}</p>
                                </div>
                                <div
                                    className="grid md:grid-cols-2 gap-y-2 md:gap-y-3 mt-1 md:mt-4 text-[13px] text-xs md:text-sm">
                                    <div className="flex gap-2 items-center ">
                                        <Grid3X3 className={"size-3"}/>
                                        <p className="-mb-1">{room.roomArea} m²</p>
                                    </div>
                                    {room.includeBreakfast && (
                                        <div className="flex gap-2 items-center">
                                            <Utensils size={18} className={"size-3 md:size-[18px]"}/>
                                            <p className="-mb-1">Include breakfast</p>
                                        </div>
                                    )}
                                    <div className="flex gap-2 items-center">
                                        <UsersRound size={18} className={"size-3 md:size-[18px]"}/>
                                        <p className="-mb-1">Sleeps {room.capacity}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <BedDouble size={18} className={"size-3 md:size-[18px]"}/>
                                        <p className="-mb-1">{room.bedTypes.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex items-center justify-between mt-5 md:mt-10 ">
                                <div>
                                    <p className="text-red-600 font-semibold md:text-lg text-sm">
                                        IDR {new Intl.NumberFormat('id-ID', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(room.price)}
                                    </p>
                                    <p className="text-slate-400 text-xs md:text-sm mt-[2px]">/night/room</p>
                                </div>

                                {room.isAvailable ?
                                    <p className={"text-xs mt-2 md:mt-0 md:text-sm font-semibold text-green-600"}>Available</p> :
                                    <p className={"text-sm font-semibold text-red-600"}>Not available</p>}
                            </div>
                            <div className={'flex flex-col md:gap-2 mt-2'}>
                                <Buttons
                                    value={room.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                    className={`${room.isAvailable ? "bg-red-600 hover:text-red-600 !border-red-600" : "bg-greenr"} !text-[9px] md:!text-sm h-fit w-full !py-1 md:!py-2 `}
                                    onClick={() => handleAvailabilityToggle(room)}
                                />
                                {deleteRoomMutation.isPending ? <LoadingAnimation/>
                                    :
                                    <div className={"flex flex-col md:flex-row gap-1 md:gap-2 mt-2"}>
                                        <Buttons value={"Delete room"} className={"md:!text-sm !text-[9px] !py-1 md:!py-2 w-full"}
                                                 onClick={() => handleDeleteRoom(room.id)}/>

                                        <Buttons
                                            value="Update room"
                                            className="md:!text-sm !text-[9px] !py-1 md:!py-2 w-full "
                                            onClick={() => window.location.href = `/dashboard/rooms/update-room?num=${room.id}&name=${room.name}`}
                                        />
                                    </div>}


                            </div>

                        </div>

                    </div>

                ))}

            </>
        </div>
    );
};

export default RoomCards;