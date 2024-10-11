"use client"

import React, {Suspense, useState} from 'react';
import GeneralDetails from "./components/general-details/GeneralDetails";
import AddPhoto from "./components/add-photo/AddPhoto";
import DeletePhoto from "./components/delete-photo/DeletePhoto";
import GeneralDetailsByName from "@/app/dashboard/rooms/update-room/components/general-details/GeneralDetailsByName";
import {Button} from "@/components/ui/button";
import Buttons from "@/components/Buttons"
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

const Page = () => {
    const [isUpdateByName, setIsUpdateByName] = useState(false);

    const toggleUpdateMethod = () => {
        setIsUpdateByName(!isUpdateByName);
    };

    return (
        <Suspense fallback={<LoadingStateAnimation/>}>
            <div className={"px-8 md:px-80 md:mt-20"}>

                <div className={"mb-12 flex items-center justify-between"}>
                    <div className={"flex flex-col "}>
                        <h2 className={"font-semibold text-xl md:text-3xl"}>
                            {isUpdateByName ? "Update rooms by type" : "Update your room"}
                        </h2>
                        <p className={"mt-[2px] md:mt-2 text-sm md:text-base text-gray-400  md:ml-[2px]"}>
                            {isUpdateByName
                                ? "Update multiple rooms of the same type at once."
                                : "Fill this field to update your room information."}
                        </p>
                    </div>

                    <Buttons value={isUpdateByName ? "Switch to Single Room Update" : "Switch to Update by Room Type"}
                             className={"h-fit"}
                             onClick={toggleUpdateMethod}/>
                </div>
                <div className={'flex flex-col gap-6 md:gap-x-10'}>
                    {isUpdateByName ? <GeneralDetailsByName/> : <GeneralDetails/>}
                    <div className={"mb-6 md:mb-0 flex-col md:flex gap-3 md:gap-0"}>
                        <AddPhoto/>
                        <DeletePhoto/>
                    </div>
                </div>
            </div>

        </Suspense>
    );
};

export default Page;