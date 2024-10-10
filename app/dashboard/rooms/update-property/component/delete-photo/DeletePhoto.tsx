"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import AddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";
import DeletePhotosPopUp from "@/app/dashboard/rooms/update-property/component/delete-photo/DeletePhotosPopUp";
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";

const AddPhoto = () => {
    const [finished, setFinished] = useState<boolean>()
    const [open, setOpen] = useState<boolean>(false)
    if (finished) {
        return <FinishCreateProperty/>
    }


    return (
        <div className=" grid grid-cols-2 items-center ">
            <div className={"flex flex-col  justify-center"}>
                <h2 className={"font-semibold text-2xl"}>Delete Photos</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Remove unwanted pictures, add some more then.
                </p>
            </div>
            <div className={"flex items-center justify-center "}>
                <DeletePhotosPopUp />
            </div>


        </div>
    );
};

export default AddPhoto;