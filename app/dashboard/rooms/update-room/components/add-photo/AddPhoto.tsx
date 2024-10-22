"use client"
import React, {useState} from 'react';
import AddPhotoPopUp from "./AddPhotoPopUp";

const UpdateRoomAddPhoto = () => {

    return (
        <div className=" md:grid grid-cols-3  ">
            <div className={"flex flex-col justify-center md:col-span-2"}>
            <h2 className={"font-semibold text-xl md:text-2xl"}>Add Photos By Room Type</h2>
                <p className={"mt-2 text-xs md:text-base text-gray-400 md:mb-8 ml-[2px]"}>Share more pictures so the world can see those rooms. Automatically added to all the chosen room name.
                </p>
            </div>
            <div className={"flex items-center mt-2 md:mt-0 justify-end md:justify-end w-full "}>
                <AddPhotoPopUp/>
            </div>
        </div>
    );
};

export default UpdateRoomAddPhoto;