"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import UpdatePropertyAddPhotoPopUp from "./component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";

const AddPhoto = () => {



    return (
        <div className=" md:grid grid-cols-2  md:items-center ">
            <div className={"flex flex-col justify-center"}>
                <h2 className={"font-semibold text-xl md:text-2xl"}>Add Photos</h2>
                <p className={"mt-2 text-sm md:text-base text-gray-400 md:mb-8 ml-[2px]"}>Share more pictures so the world can see those rooms.
                </p>
            </div>
            <div className={"flex items-center justify-end md:justify-end"}>
                <UpdatePropertyAddPhotoPopUp/>
            </div>
        </div>
    );
};

export default AddPhoto;