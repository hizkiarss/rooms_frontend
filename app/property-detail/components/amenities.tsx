import React from 'react';
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";

const amenities = [
    "High-Speed Internet Access",
    "Fitness Center",
    "Swimming Pool",
    "Spa and Wellness",
    "Airport Shuttle",
    "Childcare Services",
    "Disability Support",
    "Bar/Lounge",
    "24-Hour Front Desk",
    "Hot Tub",
];
const Amenities = () => {
    return (
        <div id="amenities" className=" scroll-mt-20 pb-8 mb-8 pt-2 border-b border-slate-300">
            <div className="">
                <h2 className={"font-semibold text-2xl "}>Popular Amenities</h2>
                <div className={"grid grid-cols-4 w-full gap-y-5 mt-6"}>
                    {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span>{getAmenityLabel(amenity)}</span>
                            <span className="">{amenity}</span>
                        </div>
                    ))}</div>

            </div>
        </div>
    );
};

export default Amenities;