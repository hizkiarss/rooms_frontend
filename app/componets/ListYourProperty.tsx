"use client";
import React from "react";
import Buttons from "@/components/Buttons";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import { useRouter } from "next/navigation";

const ListYourProperty = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("become-tenant");
  };
  return (
    <div className={"px-5 sm:px-10 md:px-20 lg:px-[80px] mb-20"}>
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <div
          className={
            "bg-[url('/homepage/listyourproperty.jpg')] h-[650px] bg-cover bg-center rounded-2xl"
          }>
          <div
            className={
              "w-full h-full bg-slate-600 bg-opacity-60 px-10 flex items-center rounded-2xl"
            }>
            <div>
              <h2
                className={
                  "text-white font-semibold text-5xl w-2/3 md:w-1/3  mb-10"
                }>
                List your property on Rooms and open your door to rental income
              </h2>
              <Buttons
                onClick={handleNavigation}
                value={"List your property"}
                className={"text-xl transition-all duration-150"}
              />
            </div>
          </div>

          <div></div>
        </div>

        <div className={"mt-10"}>
          <h2 className={"text-3xl font-semibold mb-4"}>
            Uncover the magic of Rooms{" "}
          </h2>
          <p>
            Ready for a getaway that&apos;s more than just a hotel stay? Rooms
            connects you with incredible vacation rentals—from cozy apartment to
            beachfront hotels. Start exploring and find your dream destination
            anywhere in the world with just a few clicks!
          </p>
        </div>

        <div className={"mt-10"}>
          <h2 className={"text-3xl font-semibold mb-4"}>
            Find Your Dream Stay with Rooms
          </h2>
          <p>
            No matter your adventure—whether it&apos;s a family trip with your
            furry friend, a weekend retreat, or a thrill-seeking escape—Rooms
            has the perfect spot for you. From charming cabins and lakefront
            lodges to chic city apartments and luxury hotels, each rental is
            designed to maximize your comfort. Plus, enjoy top-notch extras like
            private pools, hot tubs, and waterfront views to make your stay
            unforgettable!
          </p>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default ListYourProperty;
