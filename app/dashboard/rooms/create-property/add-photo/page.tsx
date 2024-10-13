"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import AddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";
import Buttons from "@/components/Buttons"

const Page = () => {
    const [finished, setFinished] = useState<boolean>()

    if (finished) {
        return <FinishCreateProperty/>
    }

    return (
        <div className="min-h-screen px-80 flex flex-col items-center justify-center">
            <Top/>
            <div className={"flex items-center justify-center w-full"}>
                <AddPhotoPopUp/>
            </div>
            <Buttons className={"bg-white border-greenr !text-greenr flex items-end mt-8 hover:text-greenr transition-colors duration-200 font-semibold"}
                     onClick={() => setFinished(true)}
                     value={"Finish the process"}
            />
        </div>
    );
};

export default Page;