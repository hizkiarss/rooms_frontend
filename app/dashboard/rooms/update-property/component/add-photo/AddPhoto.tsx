"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import UpdatePropertyAddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";

const AddPhoto = () => {
    const [finished, setFinished] = useState<boolean>()

    if (finished) {
        return <FinishCreateProperty/>
    }

    return (
        <div className=" grid grid-cols-2 items-center ">
            <div className={"flex flex-col  justify-center"}>
                <h2 className={"font-semibold text-2xl"}>Add Photos</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Share more pictures so the world can see those rooms.
                </p>
            </div>
            <div className={"flex items-center justify-center"}>
                <UpdatePropertyAddPhotoPopUp/>
            </div>
        </div>
    );
};

export default AddPhoto;