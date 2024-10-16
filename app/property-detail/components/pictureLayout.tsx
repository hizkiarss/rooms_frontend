"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import hotelJpg from "@/public/homepage/hotel.jpg"
import hotelJpg1 from "@/public/homepage/hotel.jpg";
import hotelJpg2 from "@/public/homepage/hotel.jpg";
import hotelJpg3 from "@/public/homepage/hotel.jpg";
import hotelJpg4 from "@/public/homepage/hotel.jpg";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";


const PictureLayout = ({ data }: { data: PropertyDetailType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const images = data.propertyPictures;

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <div className="md:grid md:grid-cols-2 gap-1 ">
            <div className="hidden md:block col-span-1 h-[400px] ">
                {images.length > 0 && (
                    <Image
                        src={images[0].imgUrl}
                        alt={"Main hotel image"}
                        height={400}
                        width={400}
                        className="object-cover object-center !w-full !h-[400px]"
                    />
                )}
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-1 h-full">
                {images.slice(1, 5).map((img, index) => (
                    <div key={index} className="h-[150px] md:h-[200px]">
                        {index < 3 ? (
                            <Image
                                src={img.imgUrl}
                                alt={`hotel-${index + 2}`}
                                className="h-[150px] object-cover md:h-[200px]"
                                height={400}
                                width={400}
                            />
                        ) : (
                            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                                <DialogTrigger asChild>
                                    <div
                                        className="w-full h-full flex items-end justify-end bg-cover bg-center"
                                        style={{ backgroundImage: `url(${images[4].imgUrl})` }}
                                    >
                                        <Button
                                            className="bg-black/50 text-white hover:bg-black/60 m-2 font-semibold"
                                            onClick={() => setIsOpen(true)}
                                        >
                                            <Camera className="mr-2" />
                                            See all
                                        </Button>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-xs md:max-w-4xl">
                                    <div className="grid grid-cols-3 gap-1 md:gap-4">
                                        {images.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img.imgUrl}
                                                alt={`Hotel image ${idx + 1}`}
                                                className="w-30 h-20 md:h-40 object-cover "
                                                width={300}
                                                height={160}
                                            />
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PictureLayout;