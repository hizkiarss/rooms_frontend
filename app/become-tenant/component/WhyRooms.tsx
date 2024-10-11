import AnimationWrapper from "@/components/animations/AnimationWrapper";
import React from "react";
import WhyRoomsItem from "./WhyRoomsItem";

const WhyRooms = () => {
  return (
    <div className="py-16 flex flex-col text-center px-5 sm:px-10 md:px-20 lg:px-[80px]">
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <p className="mb-2 font-semibold text-3xl">
          Bring the right guests within reach
        </p>
        <h2 className="font-semibold text-xl mb-10">
          Connect with millions of people whose purpose, taste and budget make
          your property the perfect place to stay.
        </h2>

        <div className="flex flex-row justify-center gap flex-wrap ">
          <WhyRoomsItem
            title="Access a world of travelers"
            desc="From long-range planners to last-minute bookers, bring travelers to your door from around the world."
            src="/icon-world-travelers.png"
            alt="icon-world-travelers"
          />

          <div className="flex flex-col max-w-[288px] items-center">
            <WhyRoomsItem
              title="Attract your ideal guests"
              desc="Book your ideal guests—travelers who delight in what you provide and want to return again and again."
              src="/icon-ideal-guests.png"
              alt="icon-ideal-guests"
            />
          </div>

          <div className="flex flex-col max-w-[288px] items-center">
            <WhyRoomsItem
              title="Grow your business"
              desc="Make decisions based on real-time data, be more competitive & help increase visibility and bookings."
              src="/icons-grow-business.png"
              alt="icons-grow-business"
            />
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default WhyRooms;
