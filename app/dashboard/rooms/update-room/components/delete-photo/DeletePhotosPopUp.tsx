"use client"
import React, {useEffect, useState} from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Buttons from "@/components/Buttons";
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area"
import {useToast} from "@/hooks/use-toast";
import {Check} from "lucide-react";
import {useGetRoomById} from "@/hooks/rooms/useGetRoomById";
import {useSearchParams} from "next/navigation";
import {useDeleteRoomPictures} from "@/hooks/rooms/useDeleteRoomPictures";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

const UpdateRoomDeletePhotoPopUp: React.FC = () => {
    const searchParam = useSearchParams()
    const {data: roomData} = useGetRoomById(searchParam.get("num") || "1")

    const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
    const deleteRoomPicturesMutation = useDeleteRoomPictures();
    const {toast} = useToast()

    useEffect(() => {
        console.log(selectedPictures);
    }, [selectedPictures]);

    const togglePictureSelection = (pictureId: string) => {
        setSelectedPictures(prev =>
            prev.includes(pictureId)
                ? prev.filter(id => id !== pictureId)
                : [...prev, pictureId]
        );
    };

    const handleDelete = () => {
        if (selectedPictures.length === 0) {
            toast({
                title: "No pictures selected",
                description: "Please select at least one picture to delete.",
                variant: "destructive",
            });
            return;
        }

        deleteRoomPicturesMutation.mutate(
            {roomPictureIds: selectedPictures},
            {
                onSuccess: (data) => {
                    toast({
                        title: "Success",
                        description: `${selectedPictures.length} picture(s) deleted successfully.`,
                    });
                    setSelectedPictures([]);
                },
                onError: (error) => {
                    toast({
                        title: "Error",
                        description: "Failed to delete pictures. Please try again.",
                        variant: "destructive",
                    });
                }
            }
        );
    };

    return (
        <div>
            <Drawer>
                <DrawerTrigger><Buttons value={"Delete pictures"} className={"text-xs md:text-base "}/></DrawerTrigger>
                <DrawerContent className={"md:inset-x-1/4 px-6 md:px-14"}>
                    <DrawerHeader className={"flex justify-end px-0"}></DrawerHeader>
                    <DrawerDescription className={"flex flex-col gap-5 md:gap-10"}>
                        {(roomData?.roomPictures?.length ?? 0) > 0 ? (
                            <ScrollArea
                                className="h-[250px] md:h-[500px] rounded-xl border-none border-slate-400 pr-4 col-span-3">
                                {deleteRoomPicturesMutation.isPending ? (
                                    <div className={"w-full h-full flex justify-center items-center"}>
                                        <LoadingAnimation/></div>) : (
                                    <div className="grid grid-cols-3 gap-1">
                                        {roomData?.roomPictures.map((picture, index) => (
                                            <div key={index} className="relative">
                                                <Image
                                                    src={picture.imgUrl}
                                                    alt={"img" + picture.id + ".png"}
                                                    width={400}
                                                    height={400}
                                                    className={`object-cover object-center w-[125px] h-[125px] md:w-[250px] md:h-[250px] cursor-pointer ${
                                                        selectedPictures.includes(picture.id) ? 'opacity-50' : ''
                                                    }`}
                                                    onClick={() => togglePictureSelection(picture.id)}
                                                />
                                                {selectedPictures.includes(picture.id) && (
                                                    <div
                                                        className="absolute bg-white text-greenr top-2 right-2  rounded-full p-[2px] md:p-2  ">
                                                        <Check/>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </ScrollArea>) : (<div className="flex items-center justify-center w-full">
                            <EmptyDataAnimation width={300} height={300} message="No pictures yet"/>
                        </div>)}
                        <div className="col-span-2">
                            <DrawerTitle className={"h-full flex justify-between"}>
                                <div>
                                    <h2 className={"text-xl md:text-3xl md:mb-2 text-black tracking-normal"}>Delete
                                        Property
                                        Pictures</h2>
                                    <p className={"font-medium mt-0 text-gray-400 text-sm md:text-[15px] tracking-normal"}>
                                        Select pictures to delete them. Scroll to
                                        see. {selectedPictures.length} picture(s) selected.
                                    </p>
                                </div>
                            </DrawerTitle>
                        </div>
                    </DrawerDescription>
                    <DrawerFooter className={"flex flex-row w-full justify-end items-center mb-3 p-1 md:p-4 md:mb-6"}>
                        <Buttons
                            value={"Delete"}
                            className={"w-fit"}
                            onClick={handleDelete}
                            disabled={deleteRoomPicturesMutation.isPending}
                        />
                        <DrawerClose>
                            <Buttons value={"Cancel"} className={"w-fit md:text-base text-sm"}/>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default UpdateRoomDeletePhotoPopUp;