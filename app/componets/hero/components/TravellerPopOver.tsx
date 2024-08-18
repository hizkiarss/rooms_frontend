import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Buttons from "@/components/Buttons";

const TravellerPopOver = () => {
    return (
            <Popover>
                <PopoverTrigger>2 Travellers</PopoverTrigger>
                <PopoverContent className="w-[450px] mt-3 px-10 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <p>Adults</p>
                        <div className={"flex gap-6 items-center"}>
                            <div
                                className={"rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center"}>
                                <button className={"text-2xl mt-[6px]"}>
                                    +
                                </button>
                            </div>
                            <p className={"mt-1"}>2</p>
                            <div
                                className={"rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center"}>
                                <button className={"text-2xl mt-[6px]"}>
                                    -
                                </button>
                            </div>
                        </div>


                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p>Children</p>
                            <p className={"text-xs"}>Age 0-17</p>
                        </div>
                        <div className={"flex gap-6 items-center"}>
                            <div
                                className={"rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center"}>
                                <button className={"text-2xl mt-[6px]"}>
                                    +
                                </button>
                            </div>
                            <p className={"mt-1"}>0</p>
                            <div
                                className={"rounded-full border border-black p-1 w-[30px] h-[30px] flex justify-center items-center"}>
                                <button className={"text-2xl mt-[6px]"}>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-end"}>
                        <Buttons value={"Done"} className={"text-lg"}/>
                    </div>


                </PopoverContent>
            </Popover>
    );
};

export default TravellerPopOver;