"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import jakarta_jpg from "../../../public/homepage/cities/jakarta.jpg"
import HomepageLocation from "@/public/HomepageLocations/HomepageLocations"
import React from 'react';
import Image from "next/image";
import HomepageLocations from "@/public/HomepageLocations/HomepageLocations";
import Autoplay from "embla-carousel-autoplay"

const PopularDestinations = () => {
    return (
        <div className={"justify-center mt-20 w-full px-[180px]"}>
            <h2 className={"text-3xl font-semibold mb-4 "}>Popular destinations</h2>
            <Carousel className={"w-full"}
                      plugins={[
                          Autoplay({
                              delay: 4000,
                          }),
                      ]}>
                <CarouselContent>
                    {HomepageLocations.map((location, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/5 lg:basis-1/4 h-[160px] border border-slate-400 rounded-xl pl-0 ml-4">
                                <Image src={location.img} alt={location.locationName + ".jpg"}
                                       className={"w-full h-[115px] object-cover object-center rounded-t-xl"}/>
                                <p className={"ml-3 mt-2 mb-2 font-semibold"}>{location.locationName}</p>
                            </CarouselItem>
                        )
                    )}

                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

        </div>

    );
};

export default PopularDestinations;