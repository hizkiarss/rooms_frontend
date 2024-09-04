import React from 'react';
import Image from "next/image";

const FindSpaces = () => {
    return (
        <div className="px-[180px] mt-16">
            <h2 className={"text-3xl font-semibold"}>Find spaces that suit your style</h2>
            <div className={"grid grid-cols-2 gap-4 mt-4"}>
                <div className={"bg-[url('/homepage/hotel.jpg')] flex items-end rounded-xl bg-cover"}>
                    <div className={"bg-gradient-to-t from-slate-700 to-transparent w-full h-1/2 flex items-end rounded-xl"}>
                        <p className={"text-xl text-white font-semibold ml-4 mb-4"}>Hotels</p>
                    </div>
                </div>

                <div className={"bg-[url('/homepage/apartment.jpg')] flex items-end h-[280px] bg-cover rounded-xl"}>
                    <div className={"bg-gradient-to-t from-slate-700 to-transparent w-full h-1/2 flex items-end rounded-xl"}>
                        <p className={"text-xl text-white font-semibold ml-4 mb-4"}>Apartment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindSpaces;