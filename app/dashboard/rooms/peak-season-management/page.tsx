"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import LoadingAnimation from "@/components/animations/LoadingAnimation";

const PeakSeasonList = dynamic(
    () => import("@/app/dashboard/rooms/peak-season-management/component/PeakSeasonList"),
    { ssr: false, loading: () => <LoadingAnimation /> }
);

const PeakSeasonPricingForm = dynamic(
    () => import("@/app/dashboard/rooms/peak-season-management/component/PeakSeasonPricingForm"),
    { ssr: false, loading: () => <LoadingAnimation /> }
);

const Page = () => {
    return (
        <div className={"px-5 md:px-40 md:my-20"}>
            <div className={"flex flex-col "}>
                <PeakSeasonList />
            </div>

            <div id={"peakSeasonCreateForm"}
                 className={"mt-16 bg-greenr py-8 px-4  md:p-8 rounded-xl"}>
                <h2 className={"font-semibold text-xl md:text-2xl text-white"}>Create a new peak season</h2>
                <p className={"mt-2 md:mt-1 text-xs md:text-base text-white mb-6 md:mb-6 md:ml-[2px]"}>
                    Establish new peak seasons to maximize your property&apos;s booking potential.
                </p>
                <PeakSeasonPricingForm />
            </div>
        </div>
    );
};

export default Page;