"use client"
import React from 'react';
import Buttons from "@/components/Buttons";
import MostBookedCarousel from "@/app/dashboard/property/components/MostBookedCarousel";
import DeletePropertyPopUp from "@/app/dashboard/property/components/DeletePropertyPopUp";

const Page = () => {
const [deletePopup, setDeletePopup] = React.useState(false);

return (
    <div className={""}>
        <MostBookedCarousel/>
        <div className={"py-10"}>
        </div>


        <div className={"flex flex-col gap-8 px-20"}>
            <div className={"flex justify-between gap-12 items-center  "}>
                <div>
                    <h2 className={'font-semibold text-3xl'}>Create a property</h2>
                    <p className={"mt-2 text-slate-400"}>Create Your Property in Just a Few Steps.</p>
                </div>
                <Buttons value={"Start now"} className={"h-fit text-xl"}
                         onClick={() => window.location.href = "/dashboard/rooms/create-property/general-details"}/>
            </div>

            <div className={"flex justify-between gap-12 items-center "}>
                <div>
                    <h2 className={'font-semibold text-3xl'}>Delete this property</h2>
                    <p className={"mt-2 text-slate-400"}>Remove this property and make room for more.</p>
                </div>

                <DeletePropertyPopUp open={deletePopup} onClose={() => setDeletePopup(false)}/>
                <Buttons value={"Delete property"} className={"h-fit text-xl"} onClick={() => setDeletePopup(true)}/>
            </div>


            <div className={"flex justify-between gap-12 items-center "}>
                <div>
                    <h2 className={'font-semibold text-3xl'}>Update this property</h2>
                    <p className={"mt-2 text-slate-400"}>Remove this property and make room for more.</p>
                </div>

                <Buttons value={"Update property"} className={"h-fit text-xl"} onClick={() => window.location.href = "/dashboard/rooms/update-property"}/>
            </div>
        </div>

    </div>
);
    }
;

export default Page;