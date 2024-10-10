import React from "react";

import Hero from "@/app/componets/hero/hero";
import PopularDestinations from "@/app/componets/popularDestination/PopularDestinations";
import FindSpaces from "@/app/componets/findSpaces/FindSpaces";
import BestHotels from "@/app/componets/bestHotels/BestHotels";
import Footer from "@/components/Footer";
import ListYourProperty from "@/app/componets/ListYourProperty";
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
