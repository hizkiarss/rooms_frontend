"use client"

import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {CalendarCheck, CircleFadingArrowUp} from "lucide-react";
import Buttons from "@/components/Buttons"
import {useGetPeakSeasonsByPropertyId} from "@/hooks/peak-season/useGetPeakSeasonsByPropertyId";
import {format} from 'date-fns';
import {PeakSeason} from "@/types/peak-season/PeakSeasonType";
import {useState} from "react";
import UpdatePeakSeasonPopUp from "@/app/dashboard/rooms/peak-season-management/component/UpdatePeakSeasonPopUp";
import DeletePeakSeasonPopup from "@/app/dashboard/rooms/peak-season-management/component/DeletePeakSeasonPopup";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";



const PeakSeasonList: React.FC = () => {
    const [updatePopUp, setUpdatePopUp] = useState<boolean>(false);
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const {selectedProperty} = useSelectedProperty()
    const {data, isLoading, error} = useGetPeakSeasonsByPropertyId("1");
    const peakSeasons = data as PeakSeason[];
    if (isLoading) return <div><LoadingAnimation/></div>;
    if (error) return <div><ErrorAnimation/></div>;

    const handleScroll = () => {
        const targetDiv = document.getElementById("peakSeasonCreateForm");
        if (targetDiv) {
            targetDiv.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <div>
            <h2 className={"font-semibold text-xl md:text-3xl"}>Peak Season Management</h2>
            <p className={"mt-[2px] md:mt-2 text-sm md:text-base text-gray-400 mb-6 md:mb-8 md:ml-[2px]"}>
                Make the most of every booking during peak travel times.
            </p>

            {peakSeasons && peakSeasons.length > 0 ? (
                <Carousel className={""}>
                    <CarouselContent>
                        {peakSeasons.map((season) => (
                            <CarouselItem key={season.id}
                                          className={"ml-4 px-6 md:px-4 md:py-4 basis-3/4 md:basis-1/3 rounded-lg border border-slate-300 py-5"}>
                                <h2 className={"font-semibold text-lg md:text-xl mb-2"}>{season.name}</h2>
                                <div className={"flex flex-col gap-1"}>
                                    <div className={"flex gap-1 text-sm md:text-lg items-center"}>
                                        <CalendarCheck/>
                                        <p className={"font-semibold mr-1 "}> Period: </p>
                                    </div>

                                    <p className={"text-sm md:text-base"}> {format(new Date(season.startDate), 'dd MMMM yyyy')} -
                                        {format(new Date(season.endDate), 'dd MMMM yyyy')}</p>
                                </div>

                                <div className={"flex items-center gap-2 mt-2"}>
                                    <CircleFadingArrowUp/>
                                    <p className={"text-sm md:text-bas"}><span
                                        className={"font-semibold mr-1 "}>Markup percentage:</span> {season.markUpPercentage}%
                                    </p>
                                </div>

                                <div className={"flex !text-sm md:!text-base justify-end gap-2 mt-4"}>
                                    <Buttons value={"Update"} onClick={() =>
                                        setUpdatePopUp(true)
                                    }/>
                                    <Buttons value={"Delete"} onClick={() => {
                                        setDeletePopUp(true)
                                    }}/>
                                </div>

                                <UpdatePeakSeasonPopUp peakSeasonId={season.id} isOpen={updatePopUp}
                                                       onClose={() => setUpdatePopUp(false)}/>

                                <DeletePeakSeasonPopup isOpen={deletePopUp} onClose={() => setDeletePopUp(false)}
                                                       peakSeasonId={season.id}/>

                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className={"translate-x-8 md:translate-x-0"}/>
                    <CarouselNext className={"-translate-x-8  md:-translate-x-0"}/>
                </Carousel>
            ) : (
                <div className={"border border-slate-400 rounded-xl py-6 flex flex-col gap-2 items-center"}>
                    <EmptyDataAnimation width={200} height={200} message={"No peak season period yet."}/>
                    <Buttons value={"Should we make one now?"} onClick={handleScroll}
                    />
                </div>)}

        </div>
    );
};

export default PeakSeasonList;