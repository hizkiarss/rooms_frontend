"use client"
import { useRef } from 'react';
import React from 'react';
import GeneralDetails from "@/app/dashboard/rooms/create-room/component/general-details/GeneralDetails";
import AddPhoto from "@/app/dashboard/rooms/create-room/component/add-photo/AddPhoto";
import PeakSeasonPricingForm from "@/app/dashboard/rooms/peak-season-management/component/PeakSeasonPricingForm";
import PeakSeasonList from "@/app/dashboard/rooms/peak-season-management/component/PeakSeasonList";

const Page = () => {
    const peakSeasonCreateFormRef = useRef<HTMLDivElement>(null);


    return (
        <div className={"px-5 md:px-40 md:mt-20"}>
            <div className={"flex flex-col "}>
                <PeakSeasonList/>
            </div>

                <div id={"peakSeasonCreateForm"}
                       className={"mt-16 bg-greenr py-8 px-4  md:p-8 rounded-xl"}>
                    <h2 className={"font-semibold text-xl md:text-2xl text-white"}>Create a new peak season</h2>
                    <p className={"mt-2 md:mt-1 text-xs md:text-base text-white mb-6 md:mb-6 md:ml-[2px]"}>Establish
                        new peak seasons to maximize your property’s booking potential.</p>
                    <PeakSeasonPricingForm />
                </div>



            <div>
            </div>
        </div>
    );
};

export default Page;