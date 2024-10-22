import React from 'react';
import GeneralDetails from "@/app/dashboard/rooms/update-property/component/general-details/GeneralDetails";
import AddPhoto from "@/app/dashboard/rooms/update-property/component/add-photo/AddPhoto";
import AddFacilities from "@/app/dashboard/rooms/update-property/component/facilities-list/AddFacilities";
import DeletePhoto from "@/app/dashboard/rooms/update-property/component/delete-photo/DeletePhoto";
import DeleteFacilities from "@/app/dashboard/rooms/update-property/component/delete-facilities/DeleteFacilities";

const Page = () => {
    return (

        <div className={"px-8 md:px-20 md:mt-20"}>
            <div className={"flex flex-col "}>
                <h2 className={"font-semibold text-xl md:text-3xl"}>Update your property</h2>
                <p className={"mt-[2px] md:mt-2 text-sm md:text-base  text-gray-400 mb-6 md:mb-8 md:ml-[2px]"}>Change these fields to update the property
                    information.</p>
            </div>
            <div className={'flex flex-col gap-6 md:grid grid-cols-2 md:gap-x-10'}>
                <GeneralDetails/>
                <div className={"mb-6 md:mb-0 flex-col md:flex gap-3 md:gap-0"}>
                    <AddPhoto/>
                    <DeletePhoto/>
                    <AddFacilities/>
                    <DeleteFacilities/>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Page;