"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BestDealsData from "@/public/DUMMY_DATA/bestHotelsDummyData/BestHotelsDummyData";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import { Headset, Home, LockKeyhole } from "lucide-react";
import { getRateLabel } from "@/utils/rateutils";
import AnimationWrapper from "@/components/animations/AnimationWrapper";

const BestDeals = () => {
  const getFinalPrice = (
    discountPercentage: string,
    originalPrice: string
  ): string => {
    const finalPrice =
      parseFloat(originalPrice) * (1 - parseFloat(discountPercentage) / 100);
    return finalPrice.toFixed(2);
  };

  return (
    // <div className={"mx-[180px]"}>
    //     <div
    //         className="mt-16 bg-[url('/homepage/besthotel.avif')] bg-cover h-[600px] rounded-2xl flex mb-20">
    //         <div
    //             className={"bg-gradient-to-t from-slate-800 to-transparent w-full h-full flex flex-col pl-10 justify-center rounded-b-2xl"}>
    //             <div className={"flex justify-between pr-10 mb-4"}>
    //                 <h2 className={"text-3xl  text-white font-semibold"}>Best Deals For You</h2>
    //                 <Buttons value={"See all deals"}
    //                          className={"bg-white text-green-800 hover:text-greensecondary"}/>
    //             </div>
    //             <Carousel className={"w-full"}>
    //                 <CarouselContent>
    //                     {BestDealsData.map((deals, index) => (
    //                             <CarouselItem
    //                                 key={index}
    //                                 className="md:basis-1/5 lg:basis-1/5 h-fit text-white pl-0 ml-4 hover:bg-opacity-30 hover:bg-white rounded-xl p-2 transition duration-200">
    //                                 <Image src={deals.img} alt={deals.name + ".jpg"}
    //                                        className={"w-full h-[115px] object-cover object-center rounded-xl"}/>
    //                                 <div className={"mt-3"}>
    //                                     <p className={"text-sm"}>{deals.city}</p>
    //                                     <p className={" text-xl font-semibold mb-6"}>{deals.name}</p>
    //                                     <div className={"mt-5 flex gap-2 items-center mb-4"}>
    //                                         <div
    //                                             className={"bg-green-600 px-2 flex text-white font-semibold rounded-lg py-[3px] items-center text-center"}>
    //                                             <p className={"text-sm font-semibold"}>{deals.rate}</p>
    //                                         </div>
    //                                         <p className={"font-semibold"}>{getRateLabel(deals.rate)}</p>
    //                                         <p className={"font-base mt-[5px]"}>({deals.totalReviews} reviews)</p>

    //                                     </div>
    //                                     <div>
    //                                         <div className={"flex items-center gap-2"}>
    //                                             <p className={"text-xl font-semibold"}>${getFinalPrice(deals.discount, deals.price)} </p>
    //                                             <p className={"text-sm"}>$
    //                                                 <del>{deals.price}</del>
    //                                             </p>
    //                                         </div>
    //                                         <p className={"text-xs"}>per night</p>
    //                                         <p className={"text-xs"}>include taxes and fees</p>
    //                                     </div>
    //                                     <div
    //                                         className={"bg-green-600 w-fit mt-4 px-2 flex text-white font-semibold rounded-lg py-[3px] items-center text-center"}>
    //                                         <p>{deals.discount}% off</p>
    //                                     </div>
    //                                 </div>

    //                             </CarouselItem>
    //                         )
    //                     )}

    //                 </CarouselContent>
    //                 {/*<CarouselPrevious/>*/}
    //                 {/*<CarouselNext/>*/}
    //             </Carousel>

    //         </div>

    //     </div>

    //     <div className={"bg-[#F5F5DC] w-full px-12 py-12 rounded-xl mb-20 grid grid-cols-4 gap-4 items-center"}>
    //         <h2 className={"col-span-1 font-semibold text-2xl text-greenr tracking-tight"}>Relax, we&apos;ve got it <br/>
    //             <span className={"tracking-normal text-[50px]"}>covered.</span></h2>
    //         <div className={"col-span-3 grid grid-cols-3 gap-4"}>
    //             <div className={"col-span-1 h-fit bg-greenr p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"}>
    //                 <Home className={"w-fit h-fit"} size={"100"}/>
    //                 <p className={""}>
    //                     Host-free stays, so it&apos;s just you and your people.
    //                 </p>
    //             </div>

    //             <div className={"col-span-1 h-fit bg-greenr p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"}>
    //                 <LockKeyhole className={"w-fit h-fit"} size={"120"}/>
    //                 <p className={""}>
    //                     Enjoy peace of mind with our secure payment options.
    //                 </p>
    //             </div>

    //             <div className={"col-span-1 h-fit bg-greenr p-6 rounded-xl text-[#F5F5DC] flex gap-4 items-center"}>
    //                 <Headset className={"w-fit h-fit"} size={"100"}/>
    //                 <p className={""}>
    //                     Get 24/7 support from a real person in about a minute. </p>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <div className={"px-5 sm:px-10 md:px-20 lg:px-[80px]"}>
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <div className="mt-16 bg-[url('/homepage/besthotel.avif')] bg-cover h-[600px] rounded-2xl flex mb-20">
          <div
            className={
              "bg-gradient-to-t from-slate-800 to-transparent w-full h-full flex flex-col pl-10 justify-center rounded-b-2xl"
            }>
            <div className={"flex justify-between pr-10 mb-4"}>
              <h2 className={"text-3xl  text-white font-semibold"}>
                Best Deals For You
              </h2>
              <Buttons
                value={"See all deals"}
                className={"bg-white text-green-800 hover:text-greensecondary"}
              />
            </div>
            <Carousel className={"w-full"}>
              <CarouselContent>
                {BestDealsData.map((deals, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 h-fit text-white pl-0 ml-4 hover:bg-opacity-30 hover:bg-white rounded-xl p-2 transition duration-200">
                    <Image
                      src={deals.img}
                      alt={deals.name + ".jpg"}
                      className={
                        "w-full h-[115px] object-cover object-center rounded-xl"
                      }
                    />
                    <div className={"mt-3"}>
                      <p className={"text-sm"}>{deals.city}</p>
                      <p className={" text-xl font-semibold mb-6"}>
                        {deals.name}
                      </p>
                      <div className={"mt-5 flex gap-2 items-center mb-4"}>
                        <div
                          className={
                            "bg-green-600 px-2 flex text-white font-semibold rounded-lg py-[3px] items-center text-center"
                          }>
                          <p className={"text-sm font-semibold"}>
                            {deals.rate}
                          </p>
                        </div>
                        <p className={"font-semibold"}>
                          {getRateLabel(deals.rate)}
                        </p>
                        <p className={"font-base mt-[5px]"}>
                          ({deals.totalReviews} reviews)
                        </p>
                      </div>
                      <div>
                        <div className={"flex items-center gap-2"}>
                          <p className={"text-xl font-semibold"}>
                            ${getFinalPrice(deals.discount, deals.price)}{" "}
                          </p>
                          <p className={"text-sm"}>
                            $<del>{deals.price}</del>
                          </p>
                        </div>
                        <p className={"text-xs"}>per night</p>
                        <p className={"text-xs"}>include taxes and fees</p>
                      </div>
                      <div
                        className={
                          "bg-green-600 w-fit mt-4 px-2 flex text-white font-semibold rounded-lg py-[3px] items-center text-center"
                        }>
                        <p>{deals.discount}% off</p>
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
