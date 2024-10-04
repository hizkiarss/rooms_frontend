import React from 'react';
import Buttons from "@/components/Buttons";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import {LogIn, LogOut} from "lucide-react";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";

const amenities = [
    "High-Speed Internet Access",
    "Fitness Center",
    "Swimming Pool",
    "Spa and Wellness",
    "Airport Shuttle",
    "Childcare Services",
    "Disability Support",
    "Bar/Lounge",
    "24-Hour Front Desk",
    "Hot Tub",
];


const Overview = ({ data }: { data: PropertyDetailType }) =>
    <div id="overview" className="my-5 scroll-mt-20  pb-4 border-b border-slate-300 mb-8 ">
        <div className="flex justify-between items-center  ">
            <div>
                <p
                    className={"bg-greenr bg-opacity-80 px-2 flex items-center pt-2 pb-[5px] rounded-lg w-fit text-white text-xs mb-[2px] "}>{data.propertyCategories.name}</p>
                <h1 className={"font-semibold text-4xl"}>{data.name}</h1>
                <div className={"flex items-end gap-3 text-[15px]"}>
                    <p className="font-semibold text-gray-500">
                        <span className="text-xl text-black -translate-x-1">{data.averageRating}</span>
                        /10
                    </p>
                    <div className={"flex items-center gap-2 text-[15px] text-slate-500 mt-4"}>
                        <p className={""}>{data.totalReview}</p>
                        <div className={"rounded-full h-[5px] w-[5px] bg-slate-500"}></div>
                        <p>{data.city.name}, Indonesia</p>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col text-end justify-end text-slate-500 text-sm "}>
                <p className={""}>Starts from</p>
                <p className={"font-semibold text-2xl text-red-600"}>IDR 1.745.868</p>
                <p className={""}>/room/night</p>
                <Buttons value={"See rooms"} className={"text-lg  mt-2 border-2 "}></Buttons>
            </div>
        </div>

        <div className={"grid grid-cols-3 items-center pt-10 mb-8 "}>
            <div id="amenities" className=" scroll-mt-20 col-span-2  ">
                <div className="">
                    <h2 className={"font-semibold text-2xl "}>Popular Amenities</h2>
                    <div className={"grid grid-cols-3 w-full gap-y-5 mt-6"}>
                        {data.propertyFacilities.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span>{getAmenityLabel(amenity.facilities.name)}</span>
                                <span className="">{amenity.facilities.name}</span>
                            </div>
                        ))}</div>

                </div>
            </div>


            <div className={"flex gap-8 border border-slate-300 w-fit h-fit py-4 px-12 rounded-xl col-span-1 "}>
                <div className={"flex flex-col items-center"}>
                    <LogIn className={""} size={'30'}/>
                    <p className={"font-semibold text-xl"}>
                        Check-in time
                    </p>
                    <p className={"text-xl"}>
                        {data.checkInTime.slice(0,5)}
                    </p>
                </div>

                <div className={"flex flex-col items-center"}>
                    <LogOut className={""} size={'30'}/>
                    <p className={"font-semibold text-xl"}>
                        Check-out time
                    </p>
                    <p className={"text-xl"}>
                        {data.checkOutTime.slice(0, 5)}
                    </p>
                </div>


            </div>
        </div>


    </div>;


export default Overview;