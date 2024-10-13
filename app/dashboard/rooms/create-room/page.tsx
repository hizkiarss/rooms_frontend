import React from 'react';
import GeneralDetails from "./component/general-details/GeneralDetails";
import AddPhoto from "./component/add-photo/AddPhoto";


const Page = () => {
    return (
        <div className={"px-8 md:px-80 md:mt-20"}>
            <div className={"flex flex-col "}>
                <h2 className={"font-semibold text-xl md:text-3xl"}>Create a room</h2>
                <p className={"mt-[2px] md:mt-2 text-sm md:text-base  text-gray-400 mb-6 md:mb-8 md:ml-[2px]"}>Fill this field to list the room
                    information.</p>
            </div>
            <div className={'flex flex-col gap-6  md:gap-x-10'}>
                <GeneralDetails/>
                <div className={"mb-6 md:mb-0 flex-col md:flex gap-3 md:gap-0"}>
                    <AddPhoto/>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Page;