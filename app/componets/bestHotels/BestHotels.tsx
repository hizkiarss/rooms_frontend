"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Buttons from "@/components/Buttons";
import { Headset, Home, LockKeyhole } from "lucide-react";
import { getRateLabel } from "@/utils/rateutils";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import { useGet10RandomAvailableRooms } from "@/hooks/rooms/useGetRandomAvailableRooms";

const BestDeals = () => {
  const {
    data: randomRooms,
    isLoading,
    error,
  } = useGet10RandomAvailableRooms();

  const getFinalPrice = (
    discountPercentage: string,
    originalPrice: string
  ): string => {
    const finalPrice =
      parseFloat(originalPrice) * (1 - parseFloat(discountPercentage) / 100);
    return finalPrice.toFixed(2);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={"px-5 sm:px-10 md:px-20 lg:px-[80px]"}>
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <div className="mt-16 bg-[url('/homepage/besthotel.avif')] bg-cover h-[600px] rounded-2xl flex mb-20">
          <div
            className={
              "bg-gradient-to-t from-slate-800 to-transparent w-full h-full flex flex-col  md:pl-10 justify-center rounded-b-2xl"
            }>
            <div
              className={
                "pl-5 flex items-center justify-between pr-5 md:pr-10 mb-4"
              }>
              <h2 className={" text-2xl md:text-3xl  text-white font-semibold"}>
                Best Deals For You
              </h2>
              <Buttons
                value={"See all deals"}
                className={
                  "bg-white min-w-fit h-fit !text-xs md:!text-base !text-green-800 hover:text-greensecondary"
                }
              />
            </div>
            <Carousel className={"w-full md:pr-8"}>
              <CarouselContent>
                {randomRooms?.map((room, index) => (
                  <CarouselItem
                    key={room.id}
                    className="bg-gray-400 bg-opacity-30 md:bg-transparent basis-5/6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-fit text-white pl-0 ml-4 hover:bg-opacity-30 hover:bg-white rounded-xl md:p-2 transition duration-200 p-5">
                    <Image
                      src={
                        room.properties.propertyPictures[0]?.imgUrl ||
                        "/placeholder.jpg"
                      }
                      alt={room.name}
                      width={200}
                      height={115}
                      className={
                        "w-full h-[115px] object-cover object-center rounded-xl"
                      }
                    />
                    <div className={"mt-3"}>
                      <p className={"text-sm"}>{room.properties.city.name}</p>
                      <p className={" text-xl font-semibold mb-6"}>
                        {room.name}
                      </p>
                      <div className={"mt-5 flex gap-2 items-center mb-4"}>
                        <div
                          className={
                            "bg-green-600 px-2 flex text-white font-semibold rounded-lg py-[3px] items-center text-center"
                          }>
                          <p className={"text-sm font-semibold"}>
                            {room.properties.averageRating}
                          </p>
                        </div>
                        <p className={"font-semibold"}>
                          {getRateLabel(
                            room.properties.averageRating.toString()
                          )}
                        </p>
                        <p className={"font-base mt-[5px]"}>
                          ({room.properties.totalReview} reviews)
                        </p>
                      </div>
                      <div>
                        <div className={"flex items-center gap-2"}>
                          <p className={"text-xl font-semibold"}>
                            ${room.price.toFixed(2)}
                          </p>
                        </div>
                        <p className={"text-xs"}>per night</p>
                        <p className={"text-xs"}>include taxes and fees</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        <div
          className={
            "bg-[#F5F5DC] w-full px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 rounded-xl mb-20 flex flex-col lg:flex-row gap-4 items-center"
          }>
          <h2
            className={
              "col-span-1 font-semibold text-xl sm:text-2xl text-greenr tracking-tight w-full lg:w-2/4 items-start "
            }>
            Relax, we&apos;ve got it <br />
            <span className={"tracking-normal text-4xl sm:text-[50px]"}>
              covered.
            </span>
          </h2>

          <div
            className={
              "col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            }>
            <div
              className={
                "col-span-1 h-[200px] bg-greenr p-4 sm:p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"
              }>
              <Home className={"w-fit h-fit"} size={"80"} />
              <p className={"text-sm sm:text-base"}>
                Host-free stays, so it&apos;s just you and your people.
              </p>
            </div>

            <div
              className={
                "col-span-1 h-[200px] bg-greenr p-4 sm:p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"
              }>
              <LockKeyhole className={"w-fit h-fit"} size={"100"} />
              <p className={"text-sm sm:text-base"}>
                Enjoy peace of mind with our secure payment options.
              </p>
            </div>

            <div
              className={
                "col-span-1 h-[200px] bg-greenr p-4 sm:p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"
              }>
              <Headset className={"w-fit h-fit"} size={"80"} />
              <p className={"text-sm sm:text-base"}>
                Get 24/7 support from a real person in about a minute.
              </p>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default BestDeals;
