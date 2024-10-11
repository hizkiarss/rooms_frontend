"use client"

import React, {useState, useEffect} from 'react';
import hero from "../../../public/homepage/hero.png"
import Image from "next/image";
import Buttons from "@/components/Buttons";
import {CalendarSearch, LocateIcon, MapPin, UserRound} from "lucide-react";
import TravellerPopOver from "@/app/componets/hero/components/TravellerPopOver";
import {DatePickerWithRange} from "@/app/componets/hero/components/DatePopOver";
import {LocationPopOver} from "@/app/componets/hero/components/LocationPopOver";
import useSearchInput from "@/hooks/useSearchInput";
import {useRouter} from "next/navigation";
import * as sea from "node:sea";
import SearchfieldEmptyPopup from"./components/SearchfieldEmptyPopUp"


const Hero = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 100); // Adjust this value as needed
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const {searchInput, setSearchInput} = useSearchInput({
        ready: false,
        searchButtonHit: false,
        totalProperties: null,
        endPrice: null,
        startPrice: null,
        sortBy: null,
        category: null,
        includeBreakfast: null,
        rating: null,
        travellersParam: null,
        cityParam: null,
        dateRangeParam: null,
        isHomepage: null,
        closed: null,
        setClosed: () => {
        },
        setIsHomepage: () => {
        },
        setCityParam: () => {
        },
        setDateRangeParam: () => {
        },
        setTravellersParam: () => {
        },
        setRating: () => {
        },
        setIncludeBreakfast: () => {
        },
        setCategory: () => {
        },
        setEndPrice: () => {
        },
        setStartPrice: () => {
        },
        setSortBy: () => {
        },
        setTotalProperties: () => {
        },
        setReady: () => {
        },
        setSearchButtonHit: () => {
        },
    });


    useEffect(() => {
        console.log(searchInput.cityParam);
        console.log(searchInput.dateRangeParam);
        console.log(searchInput.travellersParam);
    }, [searchInput]);

    const [emptyFieldWarning, setEmptyFieldWarning] = useState<boolean>(false);

    const handleSearchClick = () => {
        if (searchInput.cityParam == null || searchInput.dateRangeParam == null || searchInput.travellersParam == null) {
            setEmptyFieldWarning(true);
        }else{
            const queryParams = new URLSearchParams({
                city: searchInput.cityParam || '',
                from: searchInput.dateRangeParam?.from?.toString() || '',
                to: searchInput.dateRangeParam?.to?.toString() || '',
                adult: searchInput.travellersParam?.adults?.toString() || '',
                children: searchInput.travellersParam?.children?.toString() || '',
            }).toString();
            window.location.href = `/properties?${queryParams}`;
        }
    };
    return (
        <div className={"w-full"}>
                <SearchfieldEmptyPopup isOpen={emptyFieldWarning} onClose={()=> setEmptyFieldWarning(false)}/>
            <div
                className="bg-[url('/homepage/hero.png')] bg-cover bg-bottom bg-black bg-blend-overlay bg-opacity-30 w-full h-[584px] flex flex-col gap-5 justify-center px-[130px]">
                <h1 className={"font-semibold text-7xl text-white"}> Your stay, your way.</h1>
                <div
                    className={`w-[1440px] fixed top-[340px] flex flex-col bg-white p-2 border rounded-2xl z-10 transition-transform ${isSticky ? '-translate-y-80' : 'translate-y-full'}`}>

                    <div className={"grid grid-cols-10 gap-4 justify-center items-center py-[6px] px-4 w-full "}>
                        <div
                            className={"col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100"}>
                            <MapPin className=""/>
                            <div className={"flex flex-col w-full"}>
                                <LocationPopOver/>
                            </div>
                        </div>
                        <DatePickerWithRange className={"col-span-3 h-full w-full rounded-xl flex gap-2 items-start"}/>

                        <div
                            className={"col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100"}>
                            <UserRound className=""/>
                            <div className={"flex flex-col"}>
                                <p className={"text-xs"}>Travellers</p>
                                <TravellerPopOver/>
                            </div>
                        </div>

                        <div className={"col-span-1 flex justify-center"}>
                            <Buttons value={"Search"} className={"text-xl"} onClick={handleSearchClick}/>
                        </div>

                    </div>


                </div>
            </div>
        </div>

    );
};

export default Hero;