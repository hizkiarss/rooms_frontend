import React from 'react';
import GeneralDetails from "@/app/dashboard/rooms/update-property/component/general-details/GeneralDetails";
import AddPhoto from "@/app/dashboard/rooms/update-property/component/add-photo/AddPhoto";
import AddFacilities from "@/app/dashboard/rooms/update-property/component/facilities-list/AddFacilities";
import DeletePhoto from "@/app/dashboard/rooms/update-property/component/delete-photo/DeletePhoto";
import DeleteFacilities from "@/app/dashboard/rooms/update-property/component/delete-facilities/DeleteFacilities";

const UpdateProperty = () => {
    return (
        <div className={"px-20"}>
            <div className={"flex flex-col "}>
                <h2 className={"font-semibold text-3xl"}>Update your property</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Fill this field to update the property
                    information.</p>
            </div>
            <div className={'grid grid-cols-2 gap-x-10'}>
                <GeneralDetails/>
                <div className={"flex-col flex gap-2"}>
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

export default UpdateProperty;