"use client"
import React, {useEffect, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Buttons from "@/components/Buttons";
import useSearchInput from "@/hooks/useSearchInput";

const TravellerPopOver: React.FC = () => {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const {searchInput, setSearchInput} = useSearchInput({
        travellers: null,
        dateRange: null,
        location: null,
        ready: false,
        searchButtonHit: false,
        setReady: () => {
        },
        setSearchButtonHit: () => {
        },
        setTravellers: () => {
        },
        setDateRange: () => {
        },
        setLocation: () => {
        },
    });

    // Function to handle updating traveller data
    const handleAdultsChange = (amount: number) => {
        setAdults((prev) => Math.max(1, prev + amount));
    };

    const handleChildrenChange = (amount: number) => {
        setChildren((prev) => Math.max(0, prev + amount));
    };


    const handleClick = () => {
        setSearchInput({...searchInput, travellers: {adults, children}})
        setIsPopoverOpen(false);
    }

    return (
        <Popover onOpenChange={setIsPopoverOpen}  open={isPopoverOpen}>
            <PopoverTrigger>{adults} Adults, {children} Children</PopoverTrigger>
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
};

export default TravellerPopOver;
