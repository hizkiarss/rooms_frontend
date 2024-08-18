import React from 'react';
import hero from "../../../public/homepage/hero.png"
import Image from "next/image";
import Buttons from "@/components/Buttons";
import {CalendarSearch, LocateIcon, MapPin, UserRound} from "lucide-react";
import TravellerPopOver from "@/app/componets/hero/components/TravellerPopOver";
const Hero = () => {
    return (
        <div className="bg-[url('/homepage/hero.png')] bg-cover bg-bottom bg-black bg-blend-overlay bg-opacity-30 w-full h-[584px] flex flex-col gap-5 justify-center px-[130px]">
       <h1 className={"font-semibold text-7xl text-white"}> Your stay, your way.</h1>
            <div className={"flex gap-20 bg-white p-2 border rounded-2xl"}>
                <div className={"grid grid-cols-10 gap-4 justify-center items-center py-[6px] px-4 w-full "}>
                    <div className={"col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center"}>
                        <MapPin className=""/>
                        <div className={"flex flex-col "}>
                            <p className={"text-xs"}>Where to?</p>
                            <p className={""}>Jakarta, Indonesia</p>
                        </div>
                    </div>

                    <div className={"col-span-3 h-full border border-black rounded-xl px-3 py-2 flex gap-2 items-center"}>
                        <div className={"flex gap-2"}>
                            <CalendarSearch className=""/>
                            <p className={"mt-[3px]"}>Dates</p>

                        </div>
                    </div>

                    <div className={"col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center"}>
                        <UserRound className=""/>
                        <div className={"flex flex-col"}>
                        <p className={"text-xs"}>Travellers</p>
                            {/*<p className={""}>2 Travellers</p>*/}
                            <TravellerPopOver/>
                        </div>
                    </div>

                    <div className={"col-span-1 flex justify-center"}>
                        <Buttons value={"Search"} className={"text-xl"}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;