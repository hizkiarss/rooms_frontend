import React from 'react';
import Buttons from "@/components/Buttons";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import {LogIn, LogOut} from "lucide-react";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import StarRatingDisplay from "@/app/property-detail/components/StarRatingDisplay";
import PropertyRatingDisplay from "@/app/property-detail/components/StarRatingDisplay";

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


const Overview = ({data}: { data: PropertyDetailType }) =>
    <div id="overview" className="my-5 scroll-mt-20  pb-4 border-b border-slate-300 mb-8 ">
        <div className="md:flex justify-between items-center  ">
            <div>
                <div className={"flex gap-3 items-center"}>
                    <p
                        className={"bg-greenr bg-opacity-80 px-2 flex items-center pt-2 pb-[5px] rounded-lg w-fit text-white text-xs mb-[2px] "}>{data.propertyCategories.name}
                    </p>
                    <div className={""}>
                        <PropertyRatingDisplay rating={data.star} type={data.propertyCategories.name}/>
                    </div>
                </div>

                <h1 className={"font-semibold text-2xl md:text-4xl"}>{data.name}</h1>
                <div className={"flex items-end gap-3 text-[15px]"}>
                    <p className="font-semibold text-sm md:text-xl text-gray-500">
                        <span className="text-sm md:text-xl text-black -translate-x-1">{data.averageRating}</span>
                        /10
                    </p>
                    <div className={"flex items-center gap-2 text-sm md:text-xl text-slate-500 md:mt-4"}>
                        <p className={""}>{data.totalReview}</p>
                        <div className={"rounded-full h-[5px] w-[5px] text-sm md:text-xl bg-slate-500"}></div>
                        <p>{data.city.name}, Indonesia</p>
                    </div>
                </div>
            </div>
            <div className={"flex md:block justify-between items-center mt-3 md:mt-0"}>
                <div className={"flex flex-col text-xs  md:text-end md:justify-end text-slate-500 md:text-sm "}>
                    {/*<p className={""}>Starts from</p>*/}
                    {/*<p className={"font-semibold text-base md:text-2xl text-red-600"}>IDR 1.745.868</p>*/}
                    {/*<p className={""}>/room/night</p>*/}
                </div>
                <Buttons value={"See rooms"} className={"text-xs md:text-lg h-fit w-fit md:w-full  mt-2 border-2 "}
                         onClick={() => {
                             const element = document.getElementById("rooms");
                             if (element) {
                                 element.scrollIntoView({behavior: "smooth"});
                             }
                         }}/>

            </div>

        </div>

        <div className={"grid gap-8 md-gap-0 md:grid-cols-3 items-center pt-10 mb-8 "}>
            <div id="amenities" className=" scroll-mt-20 col-span-2  ">
                <div className="">
                    <h2 className={"font-semibold text-lg md:text-2xl "}>Popular Amenities</h2>
                    <div
                        className={"grid grid-cols-2 text-xs md:text-base md:grid-cols-3 w-full gap-x-6 gap-y-3 md:gap-y-5 mt-6"}>
                        {data.propertyFacilities.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span className={""}>{getAmenityLabel(amenity.facilities.name)}</span>
                                <span className="">{amenity.facilities.name}</span>
                            </div>
                        ))}</div>

                </div>
            </div>


            <div
                className={"grid grid-cols-2 md:flex justify-between w-[300px] gap-8 border border-slate-300 md:w-fit md:h-fit py-4 px-4 md:px-12 rounded-xl col-span-1 "}>
                <div className={"flex  flex-col items-center"}>
                    <LogIn className={""} size={'30'}/>
                    <p className={"font-semibold text-sm md:text-xl"}>
                        Check-in time
                    </p>
                    <p className={"text-base md:text-xl "}>
                        {data.checkInTime.slice(0, 5)}
                    </p>
                </div>

                <div className={"flex w-full flex-col items-center"}>
                    <LogOut className={""} size={'30'}/>
                    <p className={"font-semibold text-sm md:text-xl"}>
                        Check-out time
                    </p>
                    <p className={"text-base md:text-xl "}>
                        {data.checkOutTime.slice(0, 5)}
                    </p>
                </div>


            </div>
        </div>


    </div>;


export default Overview;