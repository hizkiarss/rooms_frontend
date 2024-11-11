"use client";
import React, {useEffect} from "react";
import dynamic from 'next/dynamic';
import PopularDestinations from "@/app/componets/popularDestination/PopularDestinations";
import FindSpaces from "@/app/componets/findSpaces/FindSpaces";
import BestHotels from "@/app/componets/bestHotels/BestHotels";
import ListYourProperty from "@/app/componets/ListYourProperty";
import {useRouter} from "next/navigation";

const DynamicHero = dynamic(
    () => import("@/app/componets/hero/hero"),
    { ssr: false }
);

const Homepage = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.pathname === "") {
                router.push("/");
            }
        }
    }, [router]);

    return (
        <div className="relative">
            <DynamicHero/>
            <PopularDestinations/>
            <FindSpaces/>
            <BestHotels/>
            <ListYourProperty/>
        </div>
    );
};

export default Homepage;