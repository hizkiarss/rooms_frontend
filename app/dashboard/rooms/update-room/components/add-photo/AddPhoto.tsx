"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import UpdatePropertyAddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import {ArrowRight} from "lucide-react";
import FinishCreateProperty from "@/app/dashboard/rooms/create-property/add-photo/component/finishCreateProperty";
import AddPhotoPopUp from "./AddPhotoPopUp";

const UpdateRoomAddPhoto = () => {

    return (
        <div className=" md:grid grid-cols-3  ">
            <div className={"flex flex-col justify-center md:col-span-2"}>
            <h2 className={"font-semibold text-xl md:text-2xl"}>Add Photos</h2>
                <p className={"mt-2 text-sm md:text-base text-gray-400 md:mb-8 ml-[2px]"}>Share more pictures so the world can see those rooms. Automatically added to all the chosen room name.
                </p>
            </div>
            <div className={"flex items-center justify-end md:justify-end w-full "}>
                <AddPhotoPopUp/>
            </div>
        </div>
    );
};

export default UpdateRoomAddPhoto;