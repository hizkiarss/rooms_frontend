"use client"
import React from 'react';
import Buttons from "@/components/Buttons";
import MostBookedCarousel from "@/app/dashboard/rooms/components/MostBookedCarousel";
import UpdateProperty from "@/app/dashboard/rooms/update-property/UpdateProperty";
import DeletePropertyPopUp from "@/app/dashboard/rooms/components/DeletePropertyPopUp";

const Page = () => {
const [deletePopup, setDeletePopup] = React.useState(false);

return (
    <div className={"py-10"}>
        <MostBookedCarousel/>
        <div className={"px-20 py-16 flex gap-16 items-start"}>
            <div className={"flex justify-between gap-12 items-center  "}>
                <div>
                    <h2 className={'font-semibold text-3xl'}>Create a property</h2>
                    <p className={"mt-2 text-slate-400"}>Create Your Property in Just a Few Steps.</p>
                </div>
                <Buttons value={"Start now"} className={"h-fit text-xl"} onClick={()=> window.location.href = "/dashboard/rooms/create-property/general-details"}/>
            </div>

            <div className={"h-20 w-1 rounded-full bg-slate-300"}></div>

            <div className={"flex justify-between gap-12 items-center "}>
                <div>
                    <h2 className={'font-semibold text-3xl'}>Delete this property</h2>
                    <p className={"mt-2 text-slate-400"}>Remove this property and make room for more.</p>
                </div>

                <DeletePropertyPopUp open={deletePopup} onClose={()=>setDeletePopup(false)}/>
                <Buttons value={"Delete property"} className={"h-fit text-xl"} onClick={()=>setDeletePopup(true)}/>
            </div>


        </div>
        <UpdateProperty/>
    </div>
);
    }
;

export default Page;