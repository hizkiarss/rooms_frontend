"use client"
import React, {useState} from 'react';
import DeleteFacilitiesPopUp  from "./DeleteFacilitiesPopUp";

const CreateRoomDeleteFacilites = () => {
    const [popUp, setPopUp] = useState<boolean>(false);

    return (
        <div className=" md:grid grid-cols-2  md:items-center ">
            <div className={"flex flex-col  justify-center"}>
                <h2 className={"font-semibold text-xl md:text-2xl"}>Delete Facilities</h2>
                <p className={"mt-2 text-sm md:text-base text-gray-400 mb-2 md:mb-8 ml-[2px]"}>Remove the old ones, add some more then.
                </p>
            </div>
            <div className={"flex items-center justify-end md:justify-center"}>
                <DeleteFacilitiesPopUp onClose={() => setPopUp(false)} isOpen={popUp}/>
            </div>
        </div>
    );
};

export default CreateRoomDeleteFacilites;