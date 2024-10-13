"use client"
import React from 'react';
import Buttons from "@/components/Buttons";
import MostBookedCarousel from "@/app/dashboard/property/components/MostBookedCarousel";
import DeletePropertyPopUp from "@/app/dashboard/property/components/DeletePropertyPopUp";

const Page = () => {
const [deletePopup, setDeletePopup] = React.useState(false);

return (
    <div className={"mt-4 px-4 md:px-8 pb-4 md:pb-8"}>

        <MostBookedCarousel/>
        <div className={"mb-8 md:py-10"}>
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4"}>
            <div className={"flex flex-col gap-8  md:gap-12 md:w-full border border-slate-300 rounded-xl p-6 md:p-8"}>
                <h2 className={"text-lg font-semibold text-greenr "}>Property Management</h2>

                <div className={"flex flex-row gap-3 justify-between md:gap-12 md:items-center  "}>
                    <div className={"md:"}>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Create a property</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-400"}>Create Your Property in
                            Just a Few Steps.</p>
                    </div>
                    <div className={"min-w-fit"}>
                        <Buttons value={"Start now"} className={"h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4"}
                                 onClick={() => window.location.href = "/dashboard/rooms/create-property/general-details"}/>
                    </div>

                </div>

                <div className={"flex flex-row gap-3 justify-between md:gap-12 md:items-center  "}>
                    <div>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Delete property</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-400"}>Remove this property and
                            make room for more.</p>
                    </div>

                    <DeletePropertyPopUp open={deletePopup} onClose={() => setDeletePopup(false)}/>
                    <Buttons value={"Delete property"}
                             className={"min-w-fit h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4"}
                             onClick={() => setDeletePopup(true)}/>
                </div>


                <div className={"flex flex-row gap-5 justify-between md:gap-12 md:items-center  "}>
                    <div>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Update property</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-400"}>Remove this property and
                            make room for more.</p>
                    </div>

                    <Buttons value={"Update property"}
                             className={"min-w-fit h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4"}
                             onClick={() => window.location.href = "/dashboard/rooms/update-property"}/>
                </div>
            </div>

            <div className={"flex flex-col gap-8  md:gap-12 md:w-full border border-slate-300 rounded-xl p-6 md:p-8 bg-greenr text-white"}>
                <h2 className={"text-lg font-semibold  "}>Rooms Management</h2>

                <div className={"flex flex-row gap-3 justify-between md:w-full md:gap-12  "}>
                    <div className={"md:"}>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Create a room</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-100"}>Create a new room in
                            just a few steps.</p>
                    </div>
                    <div className={"min-w-fit"}>
                        <Buttons value={"Start now"} className={"h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4 bg-white !text-greenr"}
                                 onClick={() => window.location.href = "/dashboard/rooms/create-room"}/>
                    </div>

                </div>

                <div className={"flex flex-row gap-3 justify-between md:gap-12 md:items-center  "}>
                    <div>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Delete room</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-100"}>Remove one, and
                            make room for more.</p>
                    </div>
                    <DeletePropertyPopUp open={deletePopup} onClose={() => setDeletePopup(false)}/>
                    <Buttons value={"Delete room"}
                             className={"min-w-fit h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4 bg-white !text-greenr"}
                             onClick={() => window.location.href = "/dashboard/rooms/room-list"}/>
                </div>


                <div className={"flex flex-row gap-5 justify-between md:gap-12 md:items-center  "}>
                    <div>
                        <h2 className={'font-semibold text-lg md:text-3xl'}>Update room</h2>
                        <p className={"mt-[3px] md:mt-2 text-xs md:text-base text-slate-100"}>Update photos, facilities, and more.</p>
                    </div>

                    <Buttons value={"Update room"}
                             className={"min-w-fit h-fit text-xs md:text-xl mt-4 md:mt-2 !px-2 md:!px-4 bg-white !text-greenr"}
                             onClick={() => window.location.href = "/dashboard/rooms/room-list"}/>
                </div>
            </div>

        </div>


    </div>
);
    }
;

export default Page;