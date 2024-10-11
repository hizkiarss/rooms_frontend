"use client";
import React from "react";
import Image from "next/image";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import { useRouter } from "next/navigation";

const FindSpaces = () => {
  const router = useRouter();
  const handleNavigation = (category: string) => {
    router.push(
      `/properties?city=Jakarta&from=&to=&adult=&children=&category=${category}`
    );
  };
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[80px] mt-16">
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <h2 className={"text-3xl font-semibold"}>
          Find spaces that suit your style
        </h2>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"}>
          <div
            onClick={() => {
              handleNavigation("Hotel");
            }}
            className={
              "bg-[url('/homepage/hotel.jpg')] h-[280px] flex items-end rounded-xl bg-cover"
            }>
            <div
              className={
                "bg-gradient-to-t from-slate-700 to-transparent w-full h-1/2 flex items-end rounded-xl"
              }>
              <p className={"text-xl text-white font-semibold ml-4 mb-4"}>
                Hotels
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              handleNavigation("Apartment");
            }}
            className={
              "bg-[url('/homepage/apartment.jpg')] flex items-end h-[280px] bg-cover rounded-xl"
            }>
            <div
              className={
                "bg-gradient-to-t from-slate-700 to-transparent w-full h-1/2 flex items-end rounded-xl"
              }>
              <p className={"text-xl text-white font-semibold ml-4 mb-4"}>
                Apartment
              </p>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default FindSpaces;
