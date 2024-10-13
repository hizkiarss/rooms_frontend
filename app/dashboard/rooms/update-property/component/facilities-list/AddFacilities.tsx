"use client"
import React from 'react';
import AddFacilitiesPopUp from "./component/AddFacilitiesPopUp";


const AddFacilities = () => {

    return (
        <div className=" md:grid grid-cols-2  md:items-center ">
            <div className={"flex flex-col  justify-center"}>
            <h2 className={"font-semibold text-xl md:text-2xl"}>Add Facilities</h2>
                <p className={"mt-2 text-sm md:text-base text-gray-400 md:mb-8 ml-[2px]"}>Share some pictures so the world can see those rooms.
                </p>
            </div>
            <div className={"flex items-center justify-end md:justify-end"}>
                <AddFacilitiesPopUp />
            </div>


        </div>
    );
};

export default AddFacilities;