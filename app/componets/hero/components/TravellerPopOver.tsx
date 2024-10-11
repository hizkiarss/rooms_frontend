"use client"
import React, {useEffect, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Buttons from "@/components/Buttons";
import useSearchInput from "@/hooks/useSearchInput";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

const TravellerPopOver: React.FC = () => {

        const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);


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
        setClosed: () => {},
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

        const handleAdultsChange = (amount: number) => {
            setAdults((prev) => Math.max(1, prev + amount));
        };

        const handleChildrenChange = (amount: number) => {
            setChildren((prev) => Math.max(0, prev + amount));
        };


        const handleClick = () => {
            setSearchInput({...searchInput, travellersParam: {adults, children}});
            setIsPopoverOpen(false);
        }


        return (
            <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
                <PopoverTrigger>{searchInput.travellersParam?.adults || adults} Adults, {searchInput.travellersParam?.children || children} Children</PopoverTrigger>
                <PopoverContent className="w-[450px] mt-3 px-10 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <p>Adults</p>
                        <div className="flex gap-6 items-center">
                            <div
                                className="rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center">
                                <button
                                    className="text-2xl mt-[6px]"
                                    onClick={() => handleAdultsChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="mt-1">{adults}</p>
                            <div
                                className="rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center">
                                <button
                                    className="text-2xl mt-[6px]"
                                    onClick={() => handleAdultsChange(-1)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p>Children</p>
                            <p className="text-xs">Age 0-17</p>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div
                                className="rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center">
                                <button
                                    className="text-2xl mt-[6px]"
                                    onClick={() => handleChildrenChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="mt-1">{children}</p>
                            <div
                                className="rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center">
                                <button
                                    className="text-2xl mt-[6px]"
                                    onClick={() => handleChildrenChange(-1)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Buttons value="Done" className="text-lg"
                                 onClick={handleClick}/>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
;

export default TravellerPopOver;
