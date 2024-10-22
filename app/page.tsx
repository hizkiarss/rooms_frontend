"use client";
import React, { useEffect } from "react";
import Hero from "@/app/componets/hero/hero";
import PopularDestinations from "@/app/componets/popularDestination/PopularDestinations";
import FindSpaces from "@/app/componets/findSpaces/FindSpaces";
import BestHotels from "@/app/componets/bestHotels/BestHotels";
import ListYourProperty from "@/app/componets/ListYourProperty";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "") {
      router.push("/");
    }
  }, [router]);

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
