"use client";
import React, { useState, useEffect } from "react";

import Buttons from "@/components/Buttons";
import { MapPin, UserRound, X } from "lucide-react";
import TravellerPopOver from "@/app/componets/hero/components/TravellerPopOver";
import { DatePickerWithRange } from "@/app/componets/hero/components/DatePopOver";
import { LocationPopOver } from "@/app/componets/hero/components/LocationPopOver";
import useSearchInput from "@/hooks/useSearchInput";
import SmallSearchInput from "../SmallSerchInput";
import { City } from "@/types/city/City";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const Hero = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { searchInput, setSearchInput } = useSearchInput({
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
    setClosed: () => {},
    setIsHomepage: () => {},
    setCityParam: () => {},
    setDateRangeParam: () => {},
    setTravellersParam: () => {},
    setRating: () => {},
    setIncludeBreakfast: () => {},
    setCategory: () => {},
    setEndPrice: () => {},
    setStartPrice: () => {},
    setSortBy: () => {},
    setTotalProperties: () => {},
    setReady: () => {},
    setSearchButtonHit: () => {},
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
      city: searchInput.cityParam || "",
      from: searchInput.dateRangeParam?.from?.toString() || "",
      to: searchInput.dateRangeParam?.to?.toString() || "",
      adult: searchInput.travellersParam?.adults?.toString() || "",
      children: searchInput.travellersParam?.children?.toString() || "",
    }).toString();
    window.location.href = `/properties?${queryParams}`;
  };

  const toggleSearchForm = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={"w-full"}>
      <div className="bg-[url('/homepage/hero.png')] bg-cover bg-bottom bg-black bg-blend-overlay bg-opacity-30 w-full h-[584px] flex flex-col gap-5 items-center justify-center px-5 sm:px-10 md:px-20 lg:px-[80px]">
        <div className="flex w-full justify-start items-start">
          <h1 className={"font-semibold text-7xl text-white"}>
            Your stay, your way.
          </h1>
        </div>
        <div
          className={`w-11/12 fixed left-1/2 -translate-x-1/2 top-[340px] flex flex-col bg-white p-2 md:p-4 border rounded-2xl z-10 transition-transform ${
            isSticky ? "-translate-y-80" : "translate-y-full"
          }`}>
          <div className="hidden xl:block">
            <div className="grid grid-cols-4 gap-4">
              <div className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                <MapPin className="flex-shrink-0 w-5 h-5 mr-2" />
                <div className="flex flex-col min-w-0">
                  <p className="text-xs whitespace-nowrap">Location</p>
                  <LocationPopOver />
                </div>
              </div>

              <div className="w-full flex items-center">
                <DatePickerWithRange className="col-span-3 h-full w-full rounded-xl flex gap-2 justify-center items-center overflow-hidden" />
              </div>

              <div className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                <UserRound className="flex-shrink-0 w-5 h-5 mr-2" />
                <div className="flex flex-col min-w-0">
                  <p className="text-xs whitespace-nowrap">Travellers</p>
                  <TravellerPopOver />
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

          <div className="xl:hidden">
            {isExpanded ? (
              <div className="relative">
                <button
                  onClick={toggleSearchForm}
                  className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
                <div className="grid grid-cols-1 gap-4 pt-8">
                  <div className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                    <MapPin className="flex-shrink-0 w-5 h-5 mr-2" />
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs whitespace-nowrap">Location</p>
                      <LocationPopOver />
                    </div>
                  </div>

                  <div className="w-full">
                    <DatePickerWithRange className="w-full rounded-xl" />
                  </div>

                  <div className="border border-black rounded-xl p-2 flex items-center hover:bg-slate-100 overflow-hidden">
                    <UserRound className="flex-shrink-0 w-5 h-5 mr-2" />
                    <div className="flex flex-col min-w-0">
                      <p className="text-xs whitespace-nowrap">Travellers</p>
                      <TravellerPopOver />
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
    </div>
  );
};

export default Hero;
{
  /* <div
          className={`w-10/12 fixed top-[340px] flex gap-20 bg-white p-2 border rounded-2xl z-10 transition-transform ${
            isSticky ? "-translate-y-80" : "translate-y-full"
          }`}>
          <div
            className={
              "grid grid-cols-10 gap-4 justify-center items-center py-[6px] px-4 w-full "
            }>
            <div
              className={
                "col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100"
              }>
              <MapPin className="" />
              <div className={"flex flex-col w-full"}>
                <LocationPopOver />
              </div>
            </div>
            <DatePickerWithRange
              className={
                "col-span-3 h-full w-full rounded-xl flex gap-2 items-start"
              }
            />

            <div
              className={
                "col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100"
              }>
              <UserRound className="" />
              <div className={"flex flex-col"}>
                <p className={"text-xs"}>Travellers</p>
                <TravellerPopOver />
              </div>
            </div>

            <div className={"col-span-1 flex justify-center"}>
              <Buttons
                value={"Search"}
                className={"text-xl"}
                onClick={handleSearchClick}
              />
            </div>
          </div>
        </div> */
}
