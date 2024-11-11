"use client";
import React, {useState, useEffect} from "react";

import Buttons from "@/components/Buttons";
import {MapPin, UserRound, X} from "lucide-react";
import TravellerPopOver from "@/app/componets/hero/components/TravellerPopOver";
import {DatePickerWithRange} from "@/app/componets/hero/components/DatePopOver";
import {LocationPopOver} from "@/app/componets/hero/components/LocationPopOver";
import useSearchInput from "@/hooks/useSearchInput";
import SmallSearchInput from "../SmallSerchInput";
import {City} from "@/types/city/City";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";

const Hero = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedCity, setSelectedCity] = React.useState<City | null>(null);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
        if (searchInput.travellersParam) {
            setAdults(searchInput.travellersParam.adults ?? 2);
            setChildren(searchInput.travellersParam.children ?? 0);
        }
    }, [searchInput.travellersParam]);
    const [adults, setAdults] = useState<number>(2);
    const [children, setChildren] = useState<number>(0);

    const [date, setDate] = React.useState<DateRange | undefined>(() => {
        if (searchInput.dateRangeParam?.from && searchInput.dateRangeParam?.to) {
            return {
                from: searchInput.dateRangeParam.from,
                to: searchInput.dateRangeParam.to,
            };
        }
        return {
            from: new Date(),
            to: addDays(new Date(), 1),
        };
    });

    const formattedFromDate = new Date(
        date?.from || new Date()
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const formattedToDate = new Date(date?.to || new Date()).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

    const showDate: string = formattedFromDate + " - " + formattedToDate;

    useEffect(() => {
        console.log(searchInput.cityParam);
        console.log(searchInput.dateRangeParam);
        console.log(searchInput.travellersParam);
    }, [searchInput]);

    const handleSearchClick = () => {
        const queryParams = new URLSearchParams({
            city: searchInput.cityParam || "Jakarta",
            from: searchInput.dateRangeParam?.from?.toString() || formattedFromDate,
            to: searchInput.dateRangeParam?.to?.toString() || formattedToDate,
            adult:
                searchInput.travellersParam?.adults?.toString() || adults.toString(),
            children:
                searchInput.travellersParam?.children?.toString() ||
                children.toString(),
        }).toString();
        window.location.href = `/properties?${queryParams}`;
    };

    const toggleSearchForm = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={"w-full"}>
            <div
                className="bg-[url('/homepage/hero.png')] bg-cover bg-bottom bg-black bg-blend-overlay bg-opacity-30 w-full h-[584px] flex flex-col gap-5 md:items-center md:justify-center px-5 sm:px-10 md:px-20 lg:px-[80px]">
                <div className="mt-40 md:mt-0 md:flex w-full justify-start items-start">
                    <h1 className={"font-semibold text-7xl md:text-7xl text-white"}>
                        Your stay, your way.
                    </h1>
                </div>
                <div
                    className={`hidden w-11/12 fixed left-1/2 -translate-x-1/2 top-[340px] md:flex flex-col bg-white p-2 md:p-4 border rounded-2xl z-10 transition-transform ${
                        isSticky ? "-translate-y-80" : "translate-y-full"
                    }`}>
                    <div className="hidden md:block">
                        <div className="grid grid-cols-4 gap-4">
                            <div
                                className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                                <MapPin className="flex-shrink-0 w-5 h-5 mr-2"/>
                                <div className="flex flex-col min-w-0">
                                    <LocationPopOver/>
                                </div>
                            </div>

                            <div className="w-full flex items-center">
                                <DatePickerWithRange
                                    className="col-span-3 h-full w-full rounded-xl flex justify-center items-center overflow-hidden"/>
                            </div>

                            <div
                                className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                                <UserRound className="flex-shrink-0 w-5 h-5 mr-2"/>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs whitespace-nowrap">Travellers</p>
                                    <TravellerPopOver/>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Buttons
                                    value={"Search"}
                                    className={"text-xl w-full"}
                                    onClick={handleSearchClick}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    className={`md:hidden w-11/12 fixed left-1/2 -translate-x-1/2 top-[280px] flex flex-col bg-white p-4 md:p-4 border rounded-2xl z-10 transition-transform ${
                        isSticky ? "-translate-y-64" : "top-[390px]"
                    }`}>
                    {isExpanded ? (
                        <div className="relative text-sm md:text-base">
                            <div className={"flex justify-between items-center"}>
                                <p className={"font-semibold text-lg"}> Find Your Destination Now</p>
                                <button
                                    onClick={toggleSearchForm}
                                    className="rounded-full hover:bg-gray-100">
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-5 md:pt-8">
                                <div
                                    className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                                    <MapPin className="flex-shrink-0 w-5 h-5 mr-2"/>
                                    <div className="flex flex-col min-w-0">
                                        <LocationPopOver/>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <DatePickerWithRange className="w-full rounded-xl"/>
                                </div>

                                <div
                                    className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                                    <UserRound className="flex-shrink-0 w-5 h-5 mr-2"/>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-xs whitespace-nowrap">Travellers</p>
                                        <TravellerPopOver/>
                                    </div>
                                </div>

                                <Buttons
                                    value={"Search"}
                                    className={"text-xl w-full"}
                                    onClick={handleSearchClick}
                                />
                            </div>
                        </div>
                    ) : (
                        <div onClick={toggleSearchForm} className="cursor-pointer">
                            <SmallSearchInput
                                cityName={
                                    searchInput.cityParam || selectedCity?.name || "Select city"
                                }
                                adult={adults}
                                childrenNumber={children}
                                date={showDate}
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Hero;

