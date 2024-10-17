"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import jakarta_jpg from "../../../public/homepage/cities/jakarta.jpg";
import HomepageLocation from "@/public/HomepageLocations/HomepageLocations";
import React from "react";
import Image from "next/image";
import HomepageLocations from "@/public/HomepageLocations/HomepageLocations";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const PopularDestinations = () => {
  const router = useRouter();
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() + 2);
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 3);
  const formattedFromDate = format(fromDate, "yyyy-MM-dd");
  const formattedToDate = format(toDate, "yyyy-MM-dd");
  const handleNavigation = (destination: string) => {
    router.push(
      `properties?city=${destination}&from=${formattedFromDate}&to=${formattedToDate}&adult=2&children=0&category=Hotel`
    );
  };

  return (
    // <div
    //   className={
    //     "flex justify-center bg-red-600 mt-20 w-full px-5 sm:px-10 md:px-20 lg:px-[80px]"
    //   }>
    //   <h2 className={"text-3xl font-semibold mb-4 "}>Popular destinations</h2>
    //   <Carousel
    //     className={"w-full bg-red-500"}
    //     plugins={[
    //       Autoplay({
    //         delay: 4000,
    //       }),
    //     ]}>
    //     <CarouselContent>
    //       {HomepageLocations.map((location, index) => (
    //         <CarouselItem
    //           key={index}
    //           className="md:basis-1/5 lg:basis-1/4 h-[160px] border border-slate-400 rounded-xl pl-0 ml-4">
    //           <Image
    //             src={location.img}
    //             alt={location.locationName + ".jpg"}
    //             className={
    //               "w-full h-[115px] object-cover object-center rounded-t-xl"
    //             }
    //           />
    //           <p className={"ml-3 mt-2 mb-2 font-semibold"}>
    //             {location.locationName}
    //           </p>
    //         </CarouselItem>
    //       ))}
    //       {/* <CarouselPrevious />
    //       <CarouselNext /> */}
    //     </CarouselContent>
    //   </Carousel>
    // </div>

    <div
      className={
        "flex flex-col items-center  mt-20 w-full px-5 sm:px-10 md:px-20 lg:px-[80px]"
      }>
      <div className="flex justify-start items-start w-full">
        <h2 className={"text-3xl font-semibold mb-4 "}>Popular destinations</h2>
      </div>
      <div className="w-full">
        <Carousel
          className={"w-full"}
          plugins={[
            Autoplay({
              delay: 4000,
            }) as any,
          ]}>
          <CarouselContent className="px-5 sm:px-10 md:px-20 lg:px-[80px]">
            {HomepageLocations.map((location, index) => (
              <CarouselItem
                key={index}
                onClick={() => handleNavigation(location.locationName)}
                className="md:basis-1/5 lg:basis-1/4 h-[160px] border border-slate-400 rounded-xl pl-0 ml-4">
                <Image
                  src={location.img}
                  alt={location.locationName + ".jpg"}
                  className={
                    "w-full h-[115px] object-cover object-center rounded-t-xl"
                  }
                />
                <p className={"ml-3 mt-2 mb-2 font-semibold"}>
                  {location.locationName}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default PopularDestinations;
