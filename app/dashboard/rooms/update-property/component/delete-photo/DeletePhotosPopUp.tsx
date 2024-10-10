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
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area"
import {useDeletePropertyPictures} from '@/hooks/properties/useDeletePropertyPictures';
import {useToast} from "@/hooks/use-toast";
import {Check} from "lucide-react";

const DeletePhotosPopUp: React.FC = () => {
    const {data} = useGetPropertyBySlug("Grun-Resort-Uluwatu-c3hz");
    const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
    const deletePropertyPicturesMutation = useDeletePropertyPictures();
    const { toast } = useToast()

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

        deletePropertyPicturesMutation.mutate(
            {propertyPictureId: selectedPictures, email: "user@example.com"},
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
                <DrawerTrigger><Buttons value={"Delete pictures"} className={""}/></DrawerTrigger>
                <DrawerContent className={"md:inset-x-1/4 px-14"}>
                    <DrawerHeader className={"flex justify-end px-0"}></DrawerHeader>
                    <DrawerDescription className={"flex flex-col gap-10"}>
                        <ScrollArea className="h-[500px] rounded-xl border-none border-slate-400 pr-4 col-span-3">
                            <div className="grid grid-cols-3 gap-1">
                                {data?.propertyPictures.map((picture, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={picture.imgUrl}
                                            alt={"img" + picture.id + ".png"}
                                            width={400}
                                            height={400}
                                            className={`object-cover object-center w-[250px] h-[250px] cursor-pointer ${
                                                selectedPictures.includes(picture.id) ? 'opacity-50' : ''
                                            }`}
                                            onClick={() => togglePictureSelection(picture.id)}
                                        />
                                        {selectedPictures.includes(picture.id) && (
                                            <div
                                                className="absolute bg-white text-greenr top-2 right-2  rounded-full p-2  ">
                                                <Check/>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="col-span-2">
                            <DrawerTitle className={"h-full flex justify-between"}>
                                <div>
                                    <h2 className={"text-3xl mb-2 text-black tracking-normal"}>Delete Property
                                        Pictures</h2>
                                    <p className={"font-medium mt-0 text-gray-400 text-[15px] tracking-normal"}>
                                        Select pictures to delete them. {selectedPictures.length} picture(s) selected.
                                    </p>
                                </div>
                            </DrawerTitle>
                        </div>
                    </DrawerDescription>
                    <DrawerFooter className={"flex flex-row w-full justify-end items-center mb-6"}>
                        <Buttons
                            value={"Delete"}
                            className={"w-fit"}
                            onClick={handleDelete}
                            disabled={deletePropertyPicturesMutation.isPending}
                        />
                        <DrawerClose>
                            <Buttons value={"Cancel"} className={"w-fit"}/>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default DeletePhotosPopUp;