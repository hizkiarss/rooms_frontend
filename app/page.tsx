import React from "react";
import Hero from "@/app/componets/hero/hero";
import PopularDestinations from "@/app/componets/popularDestination/PopularDestinations";
import FindSpaces from "@/app/componets/findSpaces/FindSpaces";
import BestHotels from "@/app/componets/bestHotels/BestHotels";
import ListYourProperty from "@/app/componets/ListYourProperty";
import Image from "next/image";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import SmallSearchInput from "./componets/SmallSerchInput";

const Homepage = () => {
  return (
    <div className="relative">
      <Hero />
      <PopularDestinations />
      <FindSpaces />
      <BestHotels />
      <ListYourProperty />
    </div>
  );
};

export default Homepage;
