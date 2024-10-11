"use client"
import React, {useState} from 'react';
import DeletePhotosPopUp from "./DeletePhotosPopUp";


const CreateRoomDeletePhoto = () => {
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

export default CreateRoomDeletePhoto;