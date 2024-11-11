import {Calendar as CalendarIcon, MapPin, SquarePen, UserRound} from "lucide-react";
import React from "react";

interface SmallSearchInputProps {
    cityName: string;
    date: string;
    adult: number;
    childrenNumber: number;
}

const SmallSearchInput: React.FC<SmallSearchInputProps> = ({
                                                               cityName,
                                                               date,
                                                               adult,
                                                               childrenNumber,
                                                           }) => {
    return (
        <>
            <div className="border rounded-2xl py-2 px-4 ">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col w-3/4 items-start text-sm gap-1">
                        <div className="flex justify-center text-sm items-start">
                            <MapPin className="flex-shrink-0 w-4 h-4 mr-1"/>
                            {cityName}
                        </div>
                        <div className="flex justify-center text-sm items-start">
                            <CalendarIcon className="mr-1 h-4 w-4"/>
                            {date}</div>
                        <div className="flex gap-1 justify-center">
                            <UserRound className="flex-shrink-0 w-4 h-4 "/>
                            <p className={""}>
                                {adult} Adult, {childrenNumber} Children{" "}
                            </p>
                        </div>
                    </div>
                    <div>
                        <SquarePen className="text-greenr"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmallSearchInput;
