"use client"
import React from 'react';
import AddPhotoPopUp from "@/app/dashboard/rooms/create-property/add-photo/component/AddPhotoPopUp";
import AddFacilitiesPopUp from "@/app/dashboard/rooms/update-property/component/facilities-list/component/AddFacilitiesPopUp";
import {useState} from "react";


const AddFacilities = () => {
    const [popUp, setPopUp] = useState<boolean>(false);

    return (
        <div className=" grid grid-cols-2 items-center ">
            <div className={"flex flex-col  justify-center"}>
                <h2 className={"font-semibold text-2xl"}>Add Facilities</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Share some pictures so the world can see those rooms.
                </p>
            </div>
            <div className={"flex items-center justify-center"}>
                <AddFacilitiesPopUp onClose={() => setPopUp(false)} isOpen={popUp}/>
            </div>


        </div>
    );
};

export default AddFacilities;