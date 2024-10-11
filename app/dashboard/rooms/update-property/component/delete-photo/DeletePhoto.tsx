"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import AddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";
import DeletePhotosPopUp from "@/app/dashboard/rooms/update-property/component/delete-photo/DeletePhotosPopUp";
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";
import UpdatePropertyAddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";

const DeletePhoto = () => {
    const [finished, setFinished] = useState<boolean>()
    const [open, setOpen] = useState<boolean>(false)
    if (finished) {
        return <FinishCreateProperty/>
    }


    return (
        <div className=" md:grid grid-cols-2  md:items-center ">
            <div className={"flex flex-col  justify-center"}>
            <h2 className={"font-semibold text-xl md:text-2xl"}>Delete Photos</h2>
                <p className={"mt-2 text-sm md:text-base text-gray-400 md:mb-8 ml-[2px]"}>Remove unwanted pictures, add some more then.
                </p>
            </div>
            <div className={"flex items-center justify-end md:justify-center "}>
                <DeletePhotosPopUp/>
            </div>


        </div>
    );
};

export default DeletePhoto;